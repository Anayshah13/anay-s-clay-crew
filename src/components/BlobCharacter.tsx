import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import type { BlobRef } from '@/hooks/useBlobCrowd';
import styles from '@/styles/blob.module.css';

export interface BlobProps {
  color: string;
  width: number;
  height: number;
  shape: string;
  eyeSize?: number;
  eyeSizeLeft?: number;  // override for asymmetric eyes
  eyeSizeRight?: number; // override for asymmetric eyes
  eyeGap?: number;
  eyelidClose?: number;
  mouthWidth?: number;
  mouthHeight?: number;
  mouthRadius?: string;
  armLength?: number;
  armWidth?: number;
  legWidth?: number;
  legHeight?: number;
  zIndex?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  faceChildren?: React.ReactNode;
  accessoryTop?: React.ReactNode;
  accessoryBody?: React.ReactNode;
  eyebrows?: React.ReactNode;
  hideLeftArm?: boolean;
  hideRightArm?: boolean;
  className?: string;
  legVariant?: 'normal' | 'pegRight';
  rowClass?: string;
  eyeScale?: number;
  isDark?: boolean;
  id?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  faceStyle?: React.CSSProperties;
}

const BlobCharacter = React.memo(forwardRef<BlobRef, BlobProps>((({
  color, width, height, shape, eyeSize = 22, eyeSizeLeft, eyeSizeRight,
  eyeGap = 18,
  eyelidClose = 0, mouthWidth = 16, mouthHeight = 7,
  mouthRadius = '0 0 50% 50%', armLength = 45, armWidth = 16,
  legWidth = 22, legHeight = 24, zIndex = 1,
  style, children, faceChildren, accessoryTop, accessoryBody,
  eyebrows, hideLeftArm, hideRightArm, className, legVariant = 'normal',
  rowClass, eyeScale, isDark, id, onMouseEnter, onMouseLeave, faceStyle
}: BlobProps, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<HTMLDivElement>(null);
  const leftArmRef = useRef<HTMLDivElement>(null);
  const rightArmRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    body: bodyRef.current,
    leftPupil: leftPupilRef.current,
    rightPupil: rightPupilRef.current,
    mouth: mouthRef.current,
    leftArm: leftArmRef.current,
    rightArm: rightArmRef.current,
  }));

  const leftEyePx = (eyeSizeLeft ?? eyeSize) * 1.3;
  const rightEyePx = (eyeSizeRight ?? eyeSize) * 1.3;

  const cssVars = {
    '--blob-color': color,
    '--blob-width': `${width}px`,
    '--blob-height': `${height}px`,
    '--blob-radius': shape,
    '--blob-eye-size': `${eyeSize}px`,
    '--blob-eye-gap': `${eyeGap}px`,
    '--arm-length': `${armLength}px`,
    '--arm-width': `${armWidth}px`,
    '--leg-width': `${legWidth}px`,
    '--leg-height': `${legHeight}px`,
    '--eyelid-close': eyelidClose,
    '--mouth-width': `${mouthWidth}px`,
    '--mouth-height': `${mouthHeight}px`,
    '--mouth-radius': mouthRadius,
    ...style,
  } as React.CSSProperties;

  const rowCls = rowClass ? (styles as any)[rowClass] || '' : '';

  const shadowColor = isDark === false ? 'rgba(0,0,0,0.15)' : (isDark === true ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.3)');
  const isFront = rowClass === 'rowFront';
  const isBack = rowClass === 'rowBack';
  const shadowWidth = isFront ? '85%' : (isBack ? '55%' : '75%');
  const shadowHeight = isFront ? 14 : (isBack ? 7 : 10);
  const shadowOpacity = isBack ? 0.6 : 1;

  const isLightModeBoost = isDark === false && ['dev', 'lego', 'astronaut'].includes(id || '');
  const dropShadowStr = isLightModeBoost ? 'drop-shadow(0 4px 20px rgba(27,57,112,0.2))' : undefined;

  return (
    <div
      ref={containerRef}
      className={`${styles.blobBase} ${rowCls} ${className || ''}`}
      style={{ ...cssVars, zIndex, filter: dropShadowStr }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={bodyRef} className={styles.blobInner} style={{ perspective: '400px' }}>
        <div className={styles.blobHighlight} />

        {/* Ground shadow — grounds every blob so they don't float */}
        <div style={{
          position: 'absolute',
          bottom: -6,
          left: '12.5%',
          width: shadowWidth,
          height: shadowHeight,
          background: `radial-gradient(ellipse, ${shadowColor} 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: -1,
          opacity: shadowOpacity
        }} />

        {accessoryTop}

        <div className={styles.blobFace} style={faceStyle}>
          {eyebrows}
          <div className={styles.blobEyeRow}>
            {/* Left eye — supports asymmetric size */}
            <div
              className={styles.blobEye}
              style={
                eyeScale
                  ? { transform: `scale(${eyeScale})`, width: leftEyePx, height: leftEyePx }
                  : { width: leftEyePx, height: leftEyePx }
              }
            >
              <div ref={leftPupilRef} className={styles.blobPupil} />
              <div data-eyelid className={styles.blobEyelid} style={{ transform: `scaleY(${eyelidClose})` }} />
            </div>
            {/* Right eye — supports asymmetric size */}
            <div
              className={styles.blobEye}
              style={
                eyeScale
                  ? { transform: `scale(${eyeScale})`, width: rightEyePx, height: rightEyePx }
                  : { width: rightEyePx, height: rightEyePx }
              }
            >
              <div ref={rightPupilRef} className={styles.blobPupil} />
              <div data-eyelid className={styles.blobEyelid} style={{ transform: `scaleY(${eyelidClose})` }} />
            </div>
          </div>
          {faceChildren}
          <div ref={mouthRef} className={styles.blobMouth} />
        </div>

        {accessoryBody}

        {/* Arms — repositioned to top: 52% for proper shoulder anchoring */}
        {!hideLeftArm && (
          <div
            ref={leftArmRef}
            className={styles.blobArmLeft}
            style={{ top: '52%', transformOrigin: 'top center' }}
          />
        )}
        {!hideRightArm && (
          <div
            ref={rightArmRef}
            className={styles.blobArmRight}
            style={{ top: '52%', transformOrigin: 'top center' }}
          />
        )}

        <div data-leg className={styles.blobLegLeft} />
        <div data-leg className={legVariant === 'pegRight' ? styles.blobLegRight : styles.blobLegRight}
          style={legVariant === 'pegRight' ? { borderRadius: '50px 50px 3px 3px', width: '14px' } : {}} />

        {children}
      </div>
    </div>
  );
})));

BlobCharacter.displayName = 'BlobCharacter';

export default BlobCharacter;
