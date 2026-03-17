// js/filter.js — Job search filtering + auto-refresh + category filtering

document.addEventListener('DOMContentLoaded', () => {

  // ── Job Search ─────────────────────────────────────────────────
  const searchKeyword    = document.getElementById('searchKeyword');
  const searchLocation   = document.getElementById('searchLocation');
  const searchType       = document.getElementById('searchType');
  const searchExperience = document.getElementById('searchExperience');
  const searchBtn        = document.getElementById('searchBtn');
  const jobGrid          = document.getElementById('jobGrid');
  const lastUpdatedEl    = document.getElementById('lastUpdated');

  // Track newly surfaced job ids for "New" badge
  let newJobIds = new Set();
  let currentJobs = [];
  let isUserFiltering = false;
  let refreshInterval = null;

  if (searchBtn && jobGrid && typeof JOBS !== 'undefined') {
    renderSkeleton();
    setTimeout(() => {
      currentJobs = shuffle([...JOBS]).slice(0, 9);
      newJobIds = new Set(currentJobs.slice(0, 3).map(j => j.id));
      renderJobs(currentJobs);
      updateTimestamp();
      startAutoRefresh();
    }, 700);

    searchBtn.addEventListener('click', () => {
      isUserFiltering = true;
      clearInterval(refreshInterval);

      const kw  = (searchKeyword?.value  || '').toLowerCase().trim();
      const loc = (searchLocation?.value || '').toLowerCase().trim();
      const typ = (searchType?.value     || '').toLowerCase().trim();
      const exp = (searchExperience?.value || '').toLowerCase().trim();

      const filtered = JOBS.filter(job => {
        const matchKw  = !kw  || job.title.toLowerCase().includes(kw) || job.company.toLowerCase().includes(kw) || job.tags.some(t => t.toLowerCase().includes(kw));
        const matchLoc = !loc || job.location.toLowerCase().includes(loc);
        const matchTyp = !typ || job.type === typ;
        const matchExp = !exp || job.experience === exp;
        return matchKw && matchLoc && matchTyp && matchExp;
      });

      newJobIds = new Set();
      renderJobs(filtered);

      // Restart auto-refresh after 60s of inactivity
      clearTimeout(window._filterResumeTimer);
      window._filterResumeTimer = setTimeout(() => {
        isUserFiltering = false;
        startAutoRefresh();
      }, 60000);
    });

    document.querySelectorAll('.popular-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        if (searchKeyword) searchKeyword.value = tag.textContent.trim();
        searchBtn.click();
      });
    });
  }

  // ── Auto Refresh ──────────────────────────────────────────────
  function startAutoRefresh() {
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      if (isUserFiltering) return;
      const shuffled = shuffle([...JOBS]);
      const next = shuffled.slice(0, 9);

      // Mark 1-2 random jobs as "new"
      newJobIds = new Set(shuffled.slice(0, 2).map(j => j.id));

      renderJobs(next, true);
      updateTimestamp();

      if (window.showToast) showToast('Job listings updated!', 'refresh-cw');
    }, 30000); // every 30 seconds
  }

  function updateTimestamp() {
    if (!lastUpdatedEl) return;
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    lastUpdatedEl.textContent = `Updated at ${h}:${m}:${s}`;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ── Render ────────────────────────────────────────────────────
  function renderJobs(jobs, animate = false) {
    if (!jobGrid) return;

    if (jobs.length === 0) {
      jobGrid.innerHTML = `
        <div class="no-results">
          <i data-lucide="search-x"></i>
          <p>No jobs match your search. Try different keywords.</p>
        </div>`;
      if (window.lucide) lucide.createIcons({ el: jobGrid });
      return;
    }

    jobGrid.innerHTML = jobs.map(job => `
      <div class="card ${animate ? 'animate-fade' : 'animate-fade'} job-card-clickable"
           data-type="${job.type}" data-job-id="${job.id}" style="cursor:pointer;">
        <div class="job-card-top">
          <span class="job-tag">${formatType(job.type)}</span>
          ${newJobIds.has(job.id) ? '<span class="new-badge">New</span>' : ''}
        </div>
        <h3>${job.title}</h3>
        <p class="job-company text-muted">${job.company} · ${job.location}</p>
        <p class="job-desc">${job.description}</p>
        <div class="job-tags-list">
          ${job.tags.map(t => `<span class="job-skill-tag">${t}</span>`).join('')}
        </div>
        <div class="job-meta">
          <span><i data-lucide="dollar-sign"></i> ${job.salary}</span>
          <span><i data-lucide="clock"></i> ${job.posted}</span>
          <span><i data-lucide="users"></i> ${job.applications} applied</span>
        </div>
        <button class="btn btn-primary btn-full" style="margin-top:1.5rem;">Apply Now</button>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons({ el: jobGrid });
  }

  function renderSkeleton() {
    if (!jobGrid) return;
    jobGrid.innerHTML = Array(6).fill(0).map(() => `
      <div class="card skeleton-card">
        <div class="skeleton skeleton-tag"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-sub"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
        <div class="skeleton skeleton-btn"></div>
      </div>
    `).join('');
  }

  function formatType(type) {
    const map = { 'full-time': 'Full-time', 'remote': 'Remote', 'internship': 'Internship' };
    return map[type] || type;
  }

  // ── Category Filter ───────────────────────────────────────────
  document.querySelectorAll('.category-nav').forEach(nav => {
    const buttons = nav.querySelectorAll('.category-btn');
    const cards   = document.querySelectorAll('.resource-card');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.textContent.trim().toLowerCase();
        let anyVisible = false;

        cards.forEach(card => {
          const dataCat = (card.dataset.category || '').toLowerCase();
          const tagEl   = card.querySelector('.prep-tag');
          const tagText = tagEl ? tagEl.textContent.trim().toLowerCase() : '';
          const tag     = dataCat || tagText;
          const match   = filter === 'all resources' || tag === filter;
          card.style.display = match ? '' : 'none';
          if (match) anyVisible = true;
        });

        const noResults = document.querySelector('.prep-no-results');
        if (noResults) noResults.classList.toggle('show', !anyVisible);
      });
    });
  });

});
