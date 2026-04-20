import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

/** Cursor diameter (filled disc). */
const BASE_SIZE = 34;
/** Scale when hovering interactive targets (pointer, buttons, `data-neo-interactive`, etc.). */
const HOVER_SCALE = 1.5;

function isOverBlobCharacter(el: Element | null): boolean {
  return el instanceof HTMLElement && !!el.closest('[data-blob-character]');
}

function isDisabledInteractiveTree(node: HTMLElement): boolean {
  if (node.closest('[aria-disabled="true"]')) return true;
  if (node.closest('[data-disabled]')) return true;
  const btn = node.closest('button');
  if (btn instanceof HTMLButtonElement && btn.disabled) return true;
  const opt = node.closest('option');
  if (opt?.closest('select[disabled]')) return true;
  return false;
}

function isLikelyClickable(el: Element | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  if (el.closest('[data-no-neo-cursor]')) return false;

  let node: HTMLElement | null = el;
  while (node) {
    if (isDisabledInteractiveTree(node)) return false;

    if (node.tagName === 'A' && (node as HTMLAnchorElement).href) return true;
    if (node.tagName === 'BUTTON') return true;
    if (node.tagName === 'LABEL') return true;
    if (node.getAttribute('role') === 'button' || node.getAttribute('role') === 'tab' || node.getAttribute('role') === 'link')
      return true;
    if (node.tagName === 'INPUT') {
      const t = (node as HTMLInputElement).type;
      if (['button', 'submit', 'checkbox', 'radio', 'file', 'reset', 'image'].includes(t)) return true;
      if (t === 'range' || t === 'color') return true;
    }
    if (node.tagName === 'SELECT' || node.tagName === 'TEXTAREA' || node.tagName === 'SUMMARY') return true;
    if (node.getAttribute('contenteditable') === 'true') return true;
    if (node.hasAttribute('data-neo-interactive')) return true;
    if (node.hasAttribute('onclick')) return true;
    const c = window.getComputedStyle(node).cursor;
    if (c === 'pointer' || c === 'grab') return true;
    node = node.parentElement;
  }
  return false;
}

/**
 * White disc + `mix-blend-mode: difference` inverts pixels behind it (per channel). Rendered via
 * **portal on `document.body`** so the backdrop is the full page under the cursor, not an isolated
 * subtree inside `#root` (which often breaks blending). Transform lives on the **same** node as
 * the blend mode so an inner stacking layer does not eat the backdrop.
 */
const NeoCursor: React.FC = () => {
  const { pathname } = useLocation();
  const isProjectsPage = pathname === '/projects' || pathname.startsWith('/projects/');

  const [on, setOn] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hoverInteractive, setHoverInteractive] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafHoverRef = useRef(0);
  const pendingPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const enable = () => setOn(fine.matches && !reduced.matches);
    enable();
    fine.addEventListener('change', enable);
    reduced.addEventListener('change', enable);
    return () => {
      fine.removeEventListener('change', enable);
      reduced.removeEventListener('change', enable);
    };
  }, []);

  useEffect(() => {
    if (!on) return;

    const root = document.documentElement;
    root.classList.add('neo-cursor-active');

    const flushHover = () => {
      rafHoverRef.current = 0;
      const p = pendingPointRef.current;
      pendingPointRef.current = null;
      if (!p) return;
      const under = document.elementFromPoint(p.x, p.y);
      const allowGrow =
        !isProjectsPage && !isOverBlobCharacter(under) && isLikelyClickable(under);
      setHoverInteractive(allowGrow);
    };

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      pendingPointRef.current = { x: e.clientX, y: e.clientY };
      if (!rafHoverRef.current) {
        rafHoverRef.current = requestAnimationFrame(flushHover);
      }
    };

    const leave = () => {
      setVisible(false);
      setHoverInteractive(false);
      pendingPointRef.current = null;
      if (rafHoverRef.current) {
        cancelAnimationFrame(rafHoverRef.current);
        rafHoverRef.current = 0;
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      root.classList.remove('neo-cursor-active');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      if (rafHoverRef.current) cancelAnimationFrame(rafHoverRef.current);
    };
  }, [on, isProjectsPage]);

  useEffect(() => {
    if (isProjectsPage) setHoverInteractive(false);
  }, [isProjectsPage]);

  if (!on || typeof document === 'undefined') return null;

  const scale = hoverInteractive ? HOVER_SCALE : 1;

  const disc = (
    <div
      aria-hidden
      className="neo-cursor-mount"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 2147483646,
        width: BASE_SIZE,
        height: BASE_SIZE,
        margin: 0,
        padding: 0,
        pointerEvents: 'none',
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'center center',
        transition: 'transform 0.16s cubic-bezier(0.22, 1, 0.36, 1)',
        visibility: visible ? 'visible' : 'hidden',
        borderRadius: '50%',
        boxSizing: 'border-box',
        background: '#ffffff',
        mixBlendMode: 'difference',
      }}
    />
  );

  return createPortal(disc, document.body);
};

export default NeoCursor;
