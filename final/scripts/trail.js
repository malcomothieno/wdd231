// trails.js – Trails page script (ES Module)
import { initNav } from './nav.js';
import { renderTrailCard, initModal } from './trailUtils.js';

let allTrails = [];

// ── Render Grid ─────────────────────────────────────────────────────
function renderGrid(trails, grid) {
  if (trails.length === 0) {
    grid.innerHTML = `<p class="loading-spinner">No trails found for this filter.</p>`;
    return;
  }
  grid.innerHTML = trails.map(trail => renderTrailCard(trail)).join('');
}

// ── Filter Trails ────────────────────────────────────────────────────
function filterTrails(difficulty, grid, countEl, modal, modalContent, closeBtn) {
  const filtered = difficulty === 'all'
    ? allTrails
    : allTrails.filter(t => t.difficulty === difficulty);

  countEl.textContent = `Showing ${filtered.length} trail${filtered.length !== 1 ? 's' : ''}`;
  renderGrid(filtered, grid);

  // Re-init modal for new DOM nodes
  initModal(grid, allTrails, modal, modalContent, closeBtn);
}

// ── Fetch & Render All Trails ────────────────────────────────────────
async function loadAllTrails() {
  const grid = document.getElementById('allTrailsGrid');
  const countEl = document.getElementById('resultsCount');
  const modal = document.getElementById('trailModal');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.getElementById('modalClose');
  const filterBtns = document.querySelectorAll('.filter-btn');

  try {
    const response = await fetch('data/trails.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();

    // Array method: sort by difficulty order then name
    const order = { Easy: 1, Moderate: 2, Hard: 3 };
    allTrails = [...data.trails].sort((a, b) => {
      const diff = order[a.difficulty] - order[b.difficulty];
      return diff !== 0 ? diff : a.name.localeCompare(b.name);
    });

    countEl.textContent = `Showing ${allTrails.length} trails`;
    renderGrid(allTrails, grid);
    initModal(grid, allTrails, modal, modalContent, closeBtn);

    // Filter button listeners
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        filterTrails(filter, grid, countEl, modal, modalContent, closeBtn);

        // Save preference to localStorage
        localStorage.setItem('greentrail_lastFilter', filter);
      });
    });

    // Restore last filter preference
    const savedFilter = localStorage.getItem('greentrail_lastFilter');
    if (savedFilter && savedFilter !== 'all') {
      const btn = [...filterBtns].find(b => b.dataset.filter === savedFilter);
      if (btn) btn.click();
    }

  } catch (error) {
    console.error('Failed to load trails:', error);
    grid.innerHTML = `<p class="loading-spinner" style="color:#C62828">
      Unable to load trail data. Please try again later.
    </p>`;
  }
}

// ── Init ─────────────────────────────────────────────────────────────
initNav();
loadAllTrails();
