/**
 * Live resume hosted on Google Drive.
 * Update by overwriting the same file (Manage versions) — keep this file ID.
 * @see https://drive.google.com/file/d/1xHwPt2bsOPyR9OCAicIgSJjp8zXR_CLr/view
 */
export const RESUME_DRIVE_FILE_ID = '1xHwPt2bsOPyR9OCAicIgSJjp8zXR_CLr';

/** iframe embed (Skills preview + modal) */
export const RESUME_PREVIEW_URL = `https://drive.google.com/file/d/${RESUME_DRIVE_FILE_ID}/preview`;

/** Force download for “Download PDF” actions */
export const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_FILE_ID}`;

/** Open in Drive viewer (nav / new tab) */
export const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_DRIVE_FILE_ID}/view`;
