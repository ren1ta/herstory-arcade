/**
 * The ONLY place the offline service worker (/sw.js, built by vite-plugin-pwa) is registered.
 * It never registers in dev, inside an iframe, or on Lovable preview hosts, and `?sw=off`
 * removes it. On the published site it also warms the page cache so the very first visit
 * is enough for the game to open later with no internet.
 */
const SW_URL = "/sw.js";
/** Must match the navigation cacheName in vite.config.ts. */
export const PAGES_CACHE = "wamihs-pages";

const PREVIEW_LABEL = /^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/;
const LOVABLE_HOSTS = [".lovable.app", ".gpt-eng.com", ".gptengineer.run"];

function isPreviewHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  const firstLabel = host.split(".")[0] ?? "";
  for (const suffix of LOVABLE_HOSTS) {
    if (!host.endsWith(suffix)) continue;
    if (PREVIEW_LABEL.test(firstLabel)) return true;
    if (/^project--[^.]+-dev$/.test(firstLabel)) return true;
  }
  const exactOrSub = (d: string) => host === d || host.endsWith(`.${d}`);
  return (
    exactOrSub("lovableproject.com") ||
    exactOrSub("lovableproject-dev.com") ||
    exactOrSub("beta.lovable.dev")
  );
}

function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

async function unregisterAppWorker(): Promise<void> {
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.allSettled(
    regs
      .filter((r) => {
        const url = r.active?.scriptURL ?? r.waiting?.scriptURL ?? r.installing?.scriptURL ?? "";
        return url.endsWith(SW_URL);
      })
      .map((r) => r.unregister()),
  );
}

export async function setupOfflineSupport(): Promise<void> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  const refused =
    !import.meta.env.PROD ||
    isInIframe() ||
    isPreviewHost(window.location.hostname) ||
    new URLSearchParams(window.location.search).has("sw", "off");

  if (refused) {
    await unregisterAppWorker().catch(() => undefined);
    return;
  }

  try {
    await navigator.serviceWorker.register(SW_URL, { scope: "/" });
    // The first page load came from the network before the worker existed; store it now
    // so the game opens offline next time without needing a second visit.
    const cache = await caches.open(PAGES_CACHE);
    await cache.add(new Request("/", { cache: "reload" }));
  } catch (err) {
    console.warn("Offline mode could not be set up:", err);
  }
}
