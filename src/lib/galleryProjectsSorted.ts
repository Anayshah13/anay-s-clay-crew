import { PROJECTS } from '@/data/projectsGalleryData.js';

const MONTH_INDEX: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

/** Parse `date` labels from gallery data (`Nov 2025`, `2026`, …) to UTC ms for sorting. */
export function galleryProjectDateMs(dateLabel: string): number {
  const s = dateLabel.trim();
  const yearOnly = /^(\d{4})$/.exec(s);
  if (yearOnly) {
    const y = Number(yearOnly[1]);
    return Date.UTC(y, 0, 1);
  }
  const m = /^([A-Za-z]{3})\s+(\d{4})$/.exec(s);
  if (m) {
    const mi = MONTH_INDEX[m[1]];
    if (mi !== undefined) return Date.UTC(Number(m[2]), mi, 1);
  }
  return 0;
}

export function compareGalleryProjectsByDateDesc(
  a: { date: string; title: string },
  b: { date: string; title: string },
): number {
  const ta = galleryProjectDateMs(a.date);
  const tb = galleryProjectDateMs(b.date);
  if (tb !== ta) return tb - ta;
  return a.title.localeCompare(b.title);
}

/** Same records as `PROJECTS`, ordered newest-first by `date` (then title). For `/projects` only. */
export const PROJECTS_SORTED_BY_DATE_DESC = [...PROJECTS].sort(compareGalleryProjectsByDateDesc);
