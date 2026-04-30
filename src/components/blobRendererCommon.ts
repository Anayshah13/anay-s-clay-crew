import type { Ref } from 'react';
import type { BlobProps } from './BlobCharacter';
import type { BlobRef } from '@/hooks/useBlobCrowd';

/** Built in BlobCrowd and spread onto BlobCharacter with renderer-specific overrides. */
export type BlobRendererCommon = BlobProps & {
  ref: Ref<BlobRef>;
  isSleepyAwake?: boolean;
};
