// main.js – Home page script (ES Module)
import { initNav } from './nav.js';
import { renderTrailCard, initModal } from './trailUtils.js';

// ── Local Storage: Track Last Visit ────────────────────────────────
function handleLastVisit() {
  const banner = document.getElementById('lastVisitBanner');
  const msg = document.getElementById('lastVisitMsg');
  const closeBtn = document.getElementById('closeBanner');

  const lastVisit = localStorage.getItem('greentrail_lastVisit');
  const now = new Date();
  const nowStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Save current visit
  localStorage.setItem('greentrail_lastVisit', now.toISOString());

  if (lastVisit) {
    const last = new Date(lastVisit);
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    let message;

    if (diffDays === 0) {
      message = `Welcome back! You visited earlier today.`;
    } else if (diffDays === 1) {
      message = `Welcome back! Your last visit was yesterday.`;
    } else {
      message = `Welcome back! Your last visit was ${diffDays} days ago.`;
    }

    msg.textContent = message;
    banner.hidden = false;

    closeBtn.addEventListener('click', () => {
      banner.hidden = true;
    });
  }
}

// ── Fetch & Render Featured Trails ─────────────────────────────────
async function loadFeaturedTrails() {
  const grid = document.getElementById('featuredGrid');
  const modal = document.getElementById('trailModal');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.getElementById('modalClose');

  try {
    const response = await fetch('data/trails.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();

    // Use array method: filter then slice for featured (easy trails, first 3)
    const featured = data.trails
      .filter(t => t.difficulty === 'Easy')
      .slice(0, 3);

    // Render cards using template literals (in trailUtils)
    grid.innerHTML = featured.map(trail => renderTrailCard(trail)).join('');

    // Update hero stat
    const countEl = document.getElementById('trailCount');
    if (countEl) countEl.textContent = `${data.trails.length}+`;

    // Init modal
    initModal(grid, data.trails, modal, modalContent, closeBtn);

  } catch (error) {
    console.error('Failed to load trails:', error);
    grid.innerHTML = `<p class="loading-spinner" style="color:#C62828">
      Unable to load trail data. Please try again later.
    </p>`;
  }
}

// ── Init ────────────────────────────────────────────────────────────
initNav();
handleLastVisit();
loadFeaturedTrails();