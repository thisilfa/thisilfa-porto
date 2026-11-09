/**
 * Join a site path onto the project-site base. import.meta.env.BASE_URL has
 * no trailing slash ('/thisilfa-porto'), so naive concatenation swallows the
 * separator — every base-prefixed URL in the site goes through here.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = base.endsWith('/') ? base : `${base}/`;
  const relative = path.startsWith('/') ? path.slice(1) : path;
  return `${normalized}${relative}`;
}
