import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import type { BlobRef } from '@/hooks/useBlobCrowd';
import styles from '@/styles/blob.module.css';

export interface BlobProps {
  color: string;
  width: number;
  height: number;
  shape: string;
  eyeSize?: number;
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
}

const BlobCharacter = React.memo(forwardRef<BlobRef, BlobProps>(({
  color, width, height, shape, eyeSize = 22, eyeGap = 18,
  eyelidClose = 0, mouthWidth = 16, mouthHeight = 7,
  mouthRadius = '0 0 50% 50%', armLength = 45, armWidth = 16,
  legWidth = 22, legHeight = 24, zIndex = 1,
  style, children, faceChildren, accessoryTop, accessoryBody,
  eyebrows, hideLeftArm, hideRightArm, className, legVariant = 'normal',
  rowClass, eyeScale
}, ref) => {
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

  const rowCls = rowClass ? styles[rowClass] || '' : '';

  return (
    <div
      ref={containerRef}
      className={`${styles.blobBase} ${rowCls} ${className || ''}`}
      style={{ ...cssVars, zIndex }}
    >
      <div ref={bodyRef} className={styles.blobInner} style={{ perspective: '400px' }}>
        <div className={styles.blobHighlight} />

        {accessoryTop}

        <div className={styles.blobFace}>
          {eyebrows}
          <div className={styles.blobEyeRow}>
            <div className={styles.blobEye} style={eyeScale ? { transform: `scale(${eyeScale})` } : undefined}>
              <div ref={leftPupilRef} className={styles.blobPupil} />
              <div data-eyelid className={styles.blobEyelid} style={{ transform: `scaleY(${eyelidClose})` }} />
            </div>
            <div className={styles.blobEye} style={eyeScale ? { transform: `scale(${eyeScale})` } : undefined}>
              <div ref={rightPupilRef} className={styles.blobPupil} />
              <div data-eyelid className={styles.blobEyelid} style={{ transform: `scaleY(${eyelidClose})` }} />
            </div>
          </div>
          {faceChildren}
          <div ref={mouthRef} className={styles.blobMouth} />
        </div>

        {accessoryBody}

        {!hideLeftArm && (
          <div ref={leftArmRef} className={styles.blobArmLeft} />
        )}
        {!hideRightArm && (
          <div ref={rightArmRef} className={styles.blobArmRight} />
        )}

        <div data-leg className={styles.blobLegLeft} />
        <div data-leg className={legVariant === 'pegRight' ? styles.blobLegRight : styles.blobLegRight}
          style={legVariant === 'pegRight' ? { borderRadius: '50px 50px 3px 3px', width: '14px' } : {}} />

        {children}
      </div>
    </div>
  );
}));

BlobCharacter.displayName = 'BlobCharacter';

export default BlobCharacter;
