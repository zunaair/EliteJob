// js/filter.js — Job search filtering + category filtering

document.addEventListener('DOMContentLoaded', () => {

  // ── Job Search ─────────────────────────────────────────────────
  const searchKeyword  = document.getElementById('searchKeyword');
  const searchLocation = document.getElementById('searchLocation');
  const searchType     = document.getElementById('searchType');
  const searchBtn      = document.getElementById('searchBtn');
  const jobGrid        = document.getElementById('jobGrid');

  if (searchBtn && jobGrid && typeof JOBS !== 'undefined') {
    renderJobs(JOBS);

    searchBtn.addEventListener('click', () => {
      const kw  = (searchKeyword?.value  || '').toLowerCase().trim();
      const loc = (searchLocation?.value || '').toLowerCase().trim();
      const typ = (searchType?.value     || '').toLowerCase().trim();

      const filtered = JOBS.filter(job => {
        const matchKw  = !kw  || job.title.toLowerCase().includes(kw)   || job.company.toLowerCase().includes(kw)  || job.tags.some(t => t.toLowerCase().includes(kw));
        const matchLoc = !loc || job.location.toLowerCase().includes(loc);
        const matchTyp = !typ || job.type === typ;
        return matchKw && matchLoc && matchTyp;
      });

      renderJobs(filtered);
    });

    // Popular tags click
    document.querySelectorAll('.popular-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        if (searchKeyword) searchKeyword.value = tag.textContent.trim();
        searchBtn.click();
      });
    });
  }

  function renderJobs(jobs) {
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
      <div class="card animate-fade" data-type="${job.type}">
        <span class="job-tag">${formatType(job.type)}</span>
        <h3>${job.title}</h3>
        <p class="job-company text-muted">${job.company} · ${job.location}</p>
        <p class="job-desc">${job.description}</p>
        <div class="job-tags-list">
          ${job.tags.map(t => `<span class="job-skill-tag">${t}</span>`).join('')}
        </div>
        <div class="job-meta">
          <span><i data-lucide="dollar-sign"></i> ${job.salary}</span>
          <span><i data-lucide="clock"></i> ${job.posted}</span>
        </div>
        <button class="btn btn-primary btn-full" style="margin-top: 1.5rem;">Apply Now</button>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons({ el: jobGrid });
  }

  function formatType(type) {
    const map = { 'full-time': 'Full-time', 'remote': 'Remote', 'internship': 'Internship' };
    return map[type] || type;
  }

  // ── Category Filter (Prep Hub on home + preparation page) ──────
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
          // Prefer data-category attribute; fall back to reading the .prep-tag text
          const dataCat = (card.dataset.category || '').toLowerCase();
          const tagEl   = card.querySelector('.prep-tag');
          const tagText = tagEl ? tagEl.textContent.trim().toLowerCase() : '';
          const tag     = dataCat || tagText;

          const match = filter === 'all resources' || tag === filter;
          card.style.display = match ? '' : 'none';
          if (match) anyVisible = true;
        });

        const noResults = document.querySelector('.prep-no-results');
        if (noResults) noResults.classList.toggle('show', !anyVisible);
      });
    });
  });

});
