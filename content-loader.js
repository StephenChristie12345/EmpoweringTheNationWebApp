// content-loader.js
(function () {
  const NAV_URL = './nav-bar.html';
  const TARGET_ID = 'nav-bar-place-holder';
  const PICO_HREF = 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.grey.min.css';
  const STYLESHEET = './styles.css';

  function ensureStyleSheet(sheet) {
    const exists = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .some(l => l.href === sheet);
    if (!exists) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = sheet;
      document.head.appendChild(link);
    }
  }

  // --- wait for placeholder ---
  function waitForPlaceholder(id) {
    return new Promise((resolve) => {
      const el = document.getElementById(id);
      if (el) return resolve(el);
      const obs = new MutationObserver(() => {
        const found = document.getElementById(id);
        if (found) {
          obs.disconnect();
          resolve(found);
        }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    });
  }

  // --- replace placeholder with navbar ---
  async function replaceWithNavbar(el) {
    const res = await fetch(NAV_URL, { credentials: 'same-origin', cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to load ${NAV_URL}: ${res.status}`);
    el.outerHTML = await res.text();
  }

  
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      ensureStyleSheet(PICO_HREF);
      ensureStyleSheet(STYLESHEET);
      const placeholder = await waitForPlaceholder(TARGET_ID);
      await replaceWithNavbar(placeholder);
    } catch (e) {
      console.warn('Navbar load failed:', e);
    }
  });
})();
