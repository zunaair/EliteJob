// js/auth.js — Sign In / Sign Up modal + form validation + job detail modal

document.addEventListener('DOMContentLoaded', () => {

  /* ── Auth Modal ─────────────────────────────────────────────── */
  const modal      = document.getElementById('authModal');
  const signInBtn  = document.getElementById('signInBtn');
  const signUpBtn  = document.getElementById('signUpBtn');
  const closeBtn   = document.getElementById('modalClose');
  const tabs       = document.querySelectorAll('.modal-tab');
  const signinForm = document.getElementById('signinForm');
  const signupForm = document.getElementById('signupForm');

  function openModal(tab) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    switchTab(tab);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    clearErrors();
  }

  function switchTab(target) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === target));
    signinForm.classList.toggle('hidden', target !== 'signin');
    signupForm.classList.toggle('hidden', target !== 'signup');
    clearErrors();
  }

  if (signInBtn) signInBtn.addEventListener('click', () => openModal('signin'));
  if (signUpBtn) signUpBtn.addEventListener('click', () => openModal('signup'));
  if (closeBtn)  closeBtn.addEventListener('click', closeModal);

  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));

  document.querySelectorAll('.switch-tab').forEach(link => {
    link.addEventListener('click', e => { e.preventDefault(); switchTab(link.dataset.target); });
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ── Form Validation ────────────────────────────────────────── */
  function showError(input, msg) {
    clearFieldError(input);
    input.classList.add('input-error');
    const err = document.createElement('p');
    err.className = 'field-error';
    err.textContent = msg;
    input.parentNode.appendChild(err);
  }

  function clearFieldError(input) {
    input.classList.remove('input-error');
    const prev = input.parentNode.querySelector('.field-error');
    if (prev) prev.remove();
  }

  function clearErrors() {
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.field-error').forEach(el => el.remove());
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Sign In validation
  const doSignIn = document.getElementById('doSignIn');
  if (doSignIn) {
    doSignIn.addEventListener('click', () => {
      clearErrors();
      const emailInput = signinForm.querySelector('input[type="email"]');
      const passInput  = signinForm.querySelector('input[type="password"]');
      let valid = true;

      if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required'); valid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Enter a valid email'); valid = false;
      }
      if (!passInput.value) {
        showError(passInput, 'Password is required'); valid = false;
      } else if (passInput.value.length < 6) {
        showError(passInput, 'Password must be at least 6 characters'); valid = false;
      }

      if (valid) {
        closeModal();
        if (window.showToast) showToast('Signed in successfully!', 'check-circle');
      }
    });
  }

  // Sign Up validation
  const doSignUp = document.getElementById('doSignUp');
  if (doSignUp) {
    doSignUp.addEventListener('click', () => {
      clearErrors();
      const nameInput  = signupForm.querySelector('input[type="text"]');
      const emailInput = signupForm.querySelector('input[type="email"]');
      const passInput  = signupForm.querySelector('input[type="password"]');
      let valid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Full name is required'); valid = false;
      }
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required'); valid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Enter a valid email'); valid = false;
      }
      if (!passInput.value) {
        showError(passInput, 'Password is required'); valid = false;
      } else if (passInput.value.length < 6) {
        showError(passInput, 'Password must be at least 6 characters'); valid = false;
      }

      if (valid) {
        closeModal();
        if (window.showToast) showToast('Account created! Welcome aboard.', 'user-check');
      }
    });
  }

  /* ── Job Detail Modal ───────────────────────────────────────── */
  const jobModal      = document.getElementById('jobModal');
  const jobModalClose = document.getElementById('jobModalClose');
  const jobModalContent = document.getElementById('jobModalContent');

  function openJobModal(job) {
    if (!jobModal || !jobModalContent) return;
    jobModalContent.innerHTML = `
      <span class="job-tag">${formatJobType(job.type)}</span>
      <h2 style="margin: 0.5rem 0 0.25rem; font-size:1.6rem;">${job.title}</h2>
      <p style="color:var(--text-muted); margin-bottom:1.5rem; font-size:0.95rem;">
        ${job.company} &nbsp;·&nbsp; ${job.location}
      </p>

      <div class="job-detail-meta">
        <div class="job-detail-stat"><i data-lucide="dollar-sign"></i><div><span>Salary</span><strong>${job.salary}</strong></div></div>
        <div class="job-detail-stat"><i data-lucide="bar-chart-2"></i><div><span>Experience</span><strong>${formatExp(job.experience)}</strong></div></div>
        <div class="job-detail-stat"><i data-lucide="users"></i><div><span>Applicants</span><strong>${job.applications}</strong></div></div>
        <div class="job-detail-stat"><i data-lucide="clock"></i><div><span>Posted</span><strong>${job.posted}</strong></div></div>
      </div>

      <div class="job-detail-section">
        <h4>About the Role</h4>
        <p>${job.description} This is an exciting opportunity to work with a world-class team and make a real impact. The ideal candidate is passionate, driven, and eager to grow in a fast-paced environment.</p>
      </div>

      <div class="job-detail-section">
        <h4>Required Skills</h4>
        <div class="job-tags-list">
          ${job.tags.map(t => `<span class="job-skill-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="job-detail-section">
        <h4>What We Offer</h4>
        <ul class="job-benefits">
          <li><i data-lucide="check"></i> Competitive salary & equity</li>
          <li><i data-lucide="check"></i> Remote-friendly culture</li>
          <li><i data-lucide="check"></i> Health & wellness benefits</li>
          <li><i data-lucide="check"></i> Learning & development budget</li>
        </ul>
      </div>

      <button class="btn btn-primary btn-full apply-now-btn" style="margin-top:1.5rem;">
        <i data-lucide="send"></i> Apply Now
      </button>
    `;
    jobModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons({ el: jobModalContent });

    jobModalContent.querySelector('.apply-now-btn').addEventListener('click', () => {
      jobModal.classList.remove('open');
      document.body.style.overflow = '';
      if (window.showToast) showToast('Application sent to recruiters!', 'send');
    });
  }

  if (jobModalClose) {
    jobModalClose.addEventListener('click', () => {
      jobModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if (jobModal) {
    jobModal.addEventListener('click', e => {
      if (e.target === jobModal) { jobModal.classList.remove('open'); document.body.style.overflow = ''; }
    });
  }

  // Delegate job card clicks
  document.addEventListener('click', e => {
    const card = e.target.closest('#jobGrid .card');
    if (!card) return;
    if (e.target.closest('button')) return; // let Apply Now handle itself
    const jobId = parseInt(card.dataset.jobId);
    if (!jobId || typeof JOBS === 'undefined') return;
    const job = JOBS.find(j => j.id === jobId);
    if (job) openJobModal(job);
  });

  function formatJobType(type) {
    return { 'full-time': 'Full-time', 'remote': 'Remote', 'internship': 'Internship' }[type] || type;
  }

  function formatExp(exp) {
    return { 'entry': 'Entry Level', 'mid': 'Mid Level', 'senior': 'Senior Level' }[exp] || exp;
  }
});
