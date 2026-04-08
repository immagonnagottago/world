// shared-nav.js — injects sidebar + topbar into every page automatically
// Root pages (index.html): <script src="js/shared-nav.js"></script>
// Pages inside /pages/: <script src="../js/shared-nav.js"></script>

(function() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const isPages = depth >= 2;
  const ROOT = isPages ? '../' : '';

  const sidebar = `
<div id="sidebar">
  <div id="sidebar-header">
    <a href="${ROOT}index.html" id="world-title">YOUR WORLD NAME</a>
    <div id="world-subtitle">A Living Encyclopedia</div>
  </div>
  <nav>
    <div class="nav-section">
      <div class="nav-section-label">Overview</div>
      <a class="nav-link" href="${ROOT}index.html">
        <span class="nav-icon">&#9670;</span> Home
      </a>
    </div>
    <div class="nav-section">
      <div class="nav-section-label">World</div>
      <a class="nav-link" href="${ROOT}pages/locations.html">
        <span class="nav-icon">&#9651;</span> Locations
      </a>
      <a class="nav-link" href="${ROOT}pages/history.html">
        <span class="nav-icon">&#9656;</span> History &amp; Timeline
      </a>
      <a class="nav-link" href="${ROOT}pages/lore.html">
        <span class="nav-icon">&#9670;</span> Lore &amp; Religion
      </a>
      <a class="nav-link" href="${ROOT}pages/magic.html">
        <span class="nav-icon">&#10022;</span> Magic &amp; Systems
      </a>
    </div>
    <div class="nav-section">
      <div class="nav-section-label">People &amp; Groups</div>
      <a class="nav-link" href="${ROOT}pages/characters.html">
        <span class="nav-icon">&#9670;</span> Characters
      </a>
      <a class="nav-link" href="${ROOT}pages/factions.html">
        <span class="nav-icon">&#9632;</span> Factions
      </a>
    </div>
    <div class="nav-section">
      <div class="nav-section-label">Creatures</div>
      <a class="nav-link" href="${ROOT}pages/bestiary.html">
        <span class="nav-icon">&#9733;</span> Bestiary
      </a>
    </div>
  </nav>
  <div id="sidebar-footer">Edit these pages in any text editor &amp; push to GitHub.</div>
</div>`;

  const topbar = `
<div id="topbar">
  <button id="menu-toggle" aria-label="Toggle menu">&#9776;</button>
  <div id="breadcrumb">
    <span id="breadcrumb-text">Loading&hellip;</span>
  </div>
  <input id="search-bar" type="search" placeholder="Search the wiki&hellip;" autocomplete="off" />
</div>`;

  document.body.insertAdjacentHTML('afterbegin', topbar);
  document.body.insertAdjacentHTML('afterbegin', sidebar);

  const title = document.querySelector('h1.article-title, .page-title');
  const crumb = document.getElementById('breadcrumb-text');
  if (crumb) crumb.textContent = title ? title.textContent : document.title;
})();
