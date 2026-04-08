// ── Search ──────────────────────────────────────────────
const searchData = [
  { title: 'Home', url: 'index.html', tags: 'overview world' },
  { title: 'Locations', url: 'pages/locations.html', tags: 'places geography' },
  { title: 'Characters', url: 'pages/characters.html', tags: 'people persons npcs' },
  { title: 'Factions', url: 'pages/factions.html', tags: 'groups organizations guilds' },
  { title: 'History & Timeline', url: 'pages/history.html', tags: 'events lore past' },
  { title: 'Magic & Systems', url: 'pages/magic.html', tags: 'rules mechanics power' },
  { title: 'Bestiary', url: 'pages/bestiary.html', tags: 'creatures monsters animals' },
  { title: 'Lore & Religion', url: 'pages/lore.html', tags: 'gods faith myths' },
];

function initSearch() {
  const bar = document.getElementById('search-bar');
  if (!bar) return;
  let dropdown = null;

  bar.addEventListener('input', () => {
    const q = bar.value.trim().toLowerCase();
    if (dropdown) { dropdown.remove(); dropdown = null; }
    if (!q) return;

    const hits = searchData.filter(p =>
      p.title.toLowerCase().includes(q) || p.tags.includes(q)
    );
    if (!hits.length) return;

    dropdown = document.createElement('div');
    dropdown.style.cssText = `
      position:absolute; top:100%; right:0; background:var(--card-bg);
      border:1px solid var(--border); border-radius:4px; min-width:220px;
      box-shadow:0 4px 16px rgba(0,0,0,0.15); z-index:200; overflow:hidden;
    `;
    hits.forEach(h => {
      const a = document.createElement('a');
      a.href = h.url;
      a.textContent = h.title;
      a.style.cssText = `
        display:block; padding:0.5rem 0.75rem; color:var(--ink);
        text-decoration:none; font-size:0.9rem;
        border-bottom:1px solid var(--parchment-darker);
        transition:background 0.1s;
      `;
      a.addEventListener('mouseenter', () => a.style.background = 'var(--parchment-dark)');
      a.addEventListener('mouseleave', () => a.style.background = '');
      dropdown.appendChild(a);
    });

    const wrap = bar.parentElement;
    wrap.style.position = 'relative';
    wrap.appendChild(dropdown);
  });

  document.addEventListener('click', e => {
    if (dropdown && !bar.contains(e.target)) {
      dropdown.remove(); dropdown = null;
    }
  });
}

// ── Active nav link ──────────────────────────────────────
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current) link.classList.add('active');
  });
}

// ── Mobile sidebar ───────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  if (!toggle || !sidebar) return;
  toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  setActiveNav();
  initMobileMenu();
});
