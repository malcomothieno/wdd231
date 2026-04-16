// trailUtils.js – Shared trail card rendering and modal logic (ES Module)

/**
 * Returns badge class based on difficulty
 * @param {string} difficulty
 * @returns {string}
 */
export function getBadgeClass(difficulty) {
  const map = { Easy: 'badge-easy', Moderate: 'badge-moderate', Hard: 'badge-hard' };
  return map[difficulty] || 'badge-easy';
}

/**
 * Renders a single trail card as an HTML string (uses template literals)
 * @param {Object} trail
 * @returns {string}
 */
export function renderTrailCard(trail) {
  const badgeClass = getBadgeClass(trail.difficulty);
  const dogIcon = trail.dogs ? '🐕 Dogs OK' : '🚫 No Dogs';

  return `
    <article class="trail-card" data-id="${trail.id}" tabindex="0" role="button"
      aria-label="View details for ${trail.name}">
      <img
        class="trail-card-img"
        src="images/trail-placeholder.svg"
        alt="${trail.name} trail"
        loading="lazy"
        width="400"
        height="160"
      />
      <div class="trail-card-body">
        <div class="trail-card-header">
          <span class="trail-name">${trail.name}</span>
          <span class="badge ${badgeClass}">${trail.difficulty}</span>
        </div>
        <div class="trail-meta">
          <div class="trail-meta-item"><span>📏</span><span>${trail.distance}</span></div>
          <div class="trail-meta-item"><span>⛰️</span><span>${trail.elevation} gain</span></div>
          <div class="trail-meta-item"><span>⏱️</span><span>${trail.duration}</span></div>
          <div class="trail-meta-item"><span>🥾</span><span>${trail.surface}</span></div>
        </div>
      </div>
      <div class="trail-card-footer">
        <button class="details-btn" data-id="${trail.id}" aria-label="More details about ${trail.name}">
          View Details →
        </button>
      </div>
    </article>
  `;
}

/**
 * Builds modal inner HTML for a trail
 * @param {Object} trail
 * @returns {string}
 */
export function renderModalContent(trail) {
  const badgeClass = getBadgeClass(trail.difficulty);
  const highlights = trail.highlights.map(h => `<li>${h}</li>`).join('');
  const dogStatus = trail.dogs ? '✅ Dogs allowed' : '❌ No dogs';

  return `
    <div class="modal-trail-name" id="modalTitle">${trail.name}</div>
    <div class="modal-badge">
      <span class="badge ${badgeClass}">${trail.difficulty}</span>
    </div>
    <div class="modal-props">
      <div class="modal-prop">
        <div class="modal-prop-label">Distance</div>
        <div class="modal-prop-value">${trail.distance}</div>
      </div>
      <div class="modal-prop">
        <div class="modal-prop-label">Elevation Gain</div>
        <div class="modal-prop-value">${trail.elevation}</div>
      </div>
      <div class="modal-prop">
        <div class="modal-prop-label">Est. Duration</div>
        <div class="modal-prop-value">${trail.duration}</div>
      </div>
      <div class="modal-prop">
        <div class="modal-prop-label">Surface</div>
        <div class="modal-prop-value">${trail.surface}</div>
      </div>
    </div>
    <p class="modal-desc">${trail.description}</p>
    <div class="modal-desc" style="margin-top:0.75rem">
      <strong>Highlights:</strong>
      <ul style="margin-top:0.4rem;padding-left:1.2rem">${highlights}</ul>
    </div>
    <div class="modal-desc" style="margin-top:0.75rem;display:flex;gap:1.5rem;flex-wrap:wrap;">
      <span>🚗 <strong>Parking:</strong> ${trail.parking}</span>
      <span>${dogStatus}</span>
    </div>
  `;
}

/**
 * Sets up modal open/close logic for a given grid container
 * @param {HTMLElement} gridEl
 * @param {Array} trails
 * @param {HTMLDialogElement} modal
 * @param {HTMLElement} modalContent
 * @param {HTMLButtonElement} closeBtn
 */
export function initModal(gridEl, trails, modal, modalContent, closeBtn) {
  // Delegate clicks on detail buttons and cards
  gridEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.details-btn') || e.target.closest('.trail-card');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const trail = trails.find(t => t.id === id);
    if (!trail) return;
    modalContent.innerHTML = renderModalContent(trail);
    modal.showModal();
  });

  // Keyboard: Enter/Space on cards
  gridEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.trail-card');
      if (!card) return;
      e.preventDefault();
      const id = parseInt(card.dataset.id);
      const trail = trails.find(t => t.id === id);
      if (!trail) return;
      modalContent.innerHTML = renderModalContent(trail);
      modal.showModal();
    }
  });

  closeBtn.addEventListener('click', () => modal.close());

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom;
    if (isOutside) modal.close();
  });

  // Close with Escape (built-in, but re-focus for UX)
  modal.addEventListener('close', () => {
    gridEl.querySelector('.trail-card')?.focus();
  });
}
