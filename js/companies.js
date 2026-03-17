// js/companies.js — Render company cards and hiring process detail

document.addEventListener('DOMContentLoaded', () => {
  if (typeof COMPANIES === 'undefined') return;

  const grid   = document.getElementById('companiesGrid');
  const panel  = document.getElementById('processPanel');

  // ── Render company cards ──────────────────────────────────────
  if (grid) {
    grid.innerHTML = COMPANIES.map(c => `
      <div class="card" onclick="showProcess('${c.id}')">
        <div class="company-card-header">
          <div class="company-logo"
               style="background:${c.logoColor}; color:${c.logoTextColor};">${c.logoLetter}</div>
          <div class="company-card-info">
            <h3>${c.name}</h3>
            <span>${c.sector}</span>
          </div>
        </div>
        <p>${c.summary}</p>
        <div class="company-tags">
          ${c.tags.map(t => `<span class="company-tag">${t}</span>`).join('')}
        </div>
        <div class="company-card-footer">
          <span class="company-rounds"><i data-lucide="layers"></i> ${c.rounds} rounds</span>
          <span class="company-diff diff-${c.difficulty.toLowerCase().replace(' ', '-')}">${c.difficulty}</span>
        </div>
        <button class="btn btn-outline btn-full" style="margin-top:1.25rem;">View Process</button>
      </div>
    `).join('');
    if (window.lucide) lucide.createIcons({ el: grid });
  }

  // ── Show hiring process detail ────────────────────────────────
  window.showProcess = function (companyId) {
    const company = COMPANIES.find(c => c.id === companyId);
    if (!company || !panel) return;

    panel.innerHTML = `
      <div class="process-panel-header">
        <div>
          <h2>Hiring Process — ${company.name}</h2>
          <p class="process-subtitle">${company.sector} · Difficulty: <strong>${company.difficulty}</strong></p>
        </div>
        <button class="close-process" onclick="closeProcess()">
          <i data-lucide="x"></i> Close
        </button>
      </div>
      <div class="process-steps">
        ${company.process.map((step, i) => `
          <div class="process-step">
            <div class="step-number">${i + 1}</div>
            <div class="step-content">
              <h4>${step.title}</h4>
              <p>${step.desc}</p>
              ${step.tips ? `
                <div class="step-tips">
                  ${step.tips.map(tip => `<span class="step-tip">${tip}</span>`).join('')}
                </div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    panel.classList.add('open');
    if (window.lucide) lucide.createIcons({ el: panel });
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.closeProcess = function () {
    panel?.classList.remove('open');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

});
