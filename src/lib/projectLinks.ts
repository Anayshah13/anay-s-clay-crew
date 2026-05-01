/** Prefer live site when both exist; otherwise GitHub. */
export function getPrimaryProjectUrl(project: {
  liveUrl?: string;
  githubUrl?: string;
}): string | null {
  return project.liveUrl ?? project.githubUrl ?? null;
}
