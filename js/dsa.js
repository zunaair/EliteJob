// js/dsa.js — DSA sheet render, toggle, progress tracking, localStorage

document.addEventListener('DOMContentLoaded', () => {
  if (typeof DSA_TOPICS === 'undefined') return;

  const container      = document.getElementById('dsaSheet');
  const progressBar    = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const progressCount  = document.getElementById('progressCount');

  const saved = JSON.parse(localStorage.getItem('dsaProgress') || '{}');

  // ── Render all topics ─────────────────────────────────────────
  container.innerHTML = DSA_TOPICS.map(topic => `
    <div class="topic-card" id="topic-${topic.id}">
      <div class="topic-row" onclick="toggleTopic('${topic.id}')">
        <div class="topic-status" id="status-${topic.id}">
          <i data-lucide="check"></i>
        </div>
        <div class="topic-info">
          <h3>${topic.title}</h3>
          <p>${topic.description}</p>
        </div>
        <div class="topic-meta">
          <span class="topic-count" id="count-${topic.id}">0 / ${topic.problems.length}</span>
        </div>
        <i data-lucide="chevron-down" class="topic-chevron"></i>
      </div>
      <div class="problem-list" id="list-${topic.id}">
        ${topic.problems.map((p, i) => {
          const key     = `${topic.id}-${i}`;
          const checked = saved[key] ? 'checked' : '';
          const solved  = saved[key] ? 'solved' : '';
          return `
            <div class="problem-item ${solved}" id="item-${key}">
              <input type="checkbox" id="cb-${key}" ${checked}
                     onchange="onCheck('${topic.id}', ${i}, this.checked)">
              <a href="${p.url}" target="_blank" rel="noopener">${p.title}</a>
              <span class="difficulty diff-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
            </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons({ el: container });

  // Restore counts and UI state after render
  DSA_TOPICS.forEach(topic => updateTopicUI(topic.id));
  updateGlobalProgress();

  // ── Toggle topic open/closed ──────────────────────────────────
  window.toggleTopic = function (id) {
    const card = document.getElementById(`topic-${id}`);
    const list = document.getElementById(`list-${id}`);
    card.classList.toggle('open');
    list.classList.toggle('open');
    if (window.lucide) lucide.createIcons({ el: card.querySelector('.topic-row') });
  };

  // ── Checkbox handler ──────────────────────────────────────────
  window.onCheck = function (topicId, idx, checked) {
    const key  = `${topicId}-${idx}`;
    const item = document.getElementById(`item-${key}`);
    if (checked) { saved[key] = true;  item?.classList.add('solved'); }
    else         { delete saved[key];  item?.classList.remove('solved'); }
    localStorage.setItem('dsaProgress', JSON.stringify(saved));
    updateTopicUI(topicId);
    updateGlobalProgress();
  };

  function updateTopicUI(topicId) {
    const topic      = DSA_TOPICS.find(t => t.id === topicId);
    if (!topic) return;
    const total      = topic.problems.length;
    const done       = topic.problems.filter((_, i) => saved[`${topicId}-${i}`]).length;
    const countEl    = document.getElementById(`count-${topicId}`);
    const statusEl   = document.getElementById(`status-${topicId}`);
    const cardEl     = document.getElementById(`topic-${topicId}`);

    if (countEl) countEl.textContent = `${done} / ${total}`;
    if (done === total && total > 0) {
      statusEl?.classList.add('all-done');
      cardEl?.classList.add('all-done');
    } else {
      statusEl?.classList.remove('all-done');
      cardEl?.classList.remove('all-done');
    }
    if (window.lucide) lucide.createIcons({ el: statusEl });
  }

  function updateGlobalProgress() {
    const total   = DSA_TOPICS.reduce((sum, t) => sum + t.problems.length, 0);
    const done    = Object.keys(saved).length;
    const percent = total ? Math.round((done / total) * 100) : 0;

    if (progressBar)     progressBar.style.width = percent + '%';
    if (progressPercent) progressPercent.textContent = percent + '%';
    if (progressCount)   progressCount.textContent = `${done} / ${total} solved`;
  }

  // ── Controls ──────────────────────────────────────────────────
  document.getElementById('expandAllBtn')?.addEventListener('click', () => {
    DSA_TOPICS.forEach(t => {
      const card = document.getElementById(`topic-${t.id}`);
      const list = document.getElementById(`list-${t.id}`);
      card?.classList.add('open');
      list?.classList.add('open');
    });
    if (window.lucide) lucide.createIcons({ el: container });
  });

  document.getElementById('collapseAllBtn')?.addEventListener('click', () => {
    DSA_TOPICS.forEach(t => {
      document.getElementById(`topic-${t.id}`)?.classList.remove('open');
      document.getElementById(`list-${t.id}`)?.classList.remove('open');
    });
  });

  document.getElementById('resetProgressBtn')?.addEventListener('click', () => {
    if (!confirm('Reset all progress? This cannot be undone.')) return;
    localStorage.removeItem('dsaProgress');
    location.reload();
  });

});
