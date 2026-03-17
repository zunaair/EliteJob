// js/auth.js — Sign In / Sign Up modal logic

document.addEventListener('DOMContentLoaded', () => {
  const modal     = document.getElementById('authModal');
  const signInBtn = document.getElementById('signInBtn');
  const signUpBtn = document.getElementById('signUpBtn');
  const closeBtn  = document.getElementById('modalClose');
  const tabs      = document.querySelectorAll('.modal-tab');
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
  }

  function switchTab(target) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === target));
    signinForm.classList.toggle('hidden', target !== 'signin');
    signupForm.classList.toggle('hidden', target !== 'signup');
  }

  if (signInBtn) signInBtn.addEventListener('click', () => openModal('signin'));
  if (signUpBtn) signUpBtn.addEventListener('click', () => openModal('signup'));
  if (closeBtn)  closeBtn.addEventListener('click', closeModal);

  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Switch tab links inside forms
  document.querySelectorAll('.switch-tab').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      switchTab(link.dataset.target);
    });
  });

  // Sign In button
  const doSignIn = document.getElementById('doSignIn');
  if (doSignIn) {
    doSignIn.addEventListener('click', () => {
      closeModal();
      if (window.showToast) showToast('Signed in successfully!', 'check-circle');
    });
  }

  // Sign Up button
  const doSignUp = document.getElementById('doSignUp');
  if (doSignUp) {
    doSignUp.addEventListener('click', () => {
      closeModal();
      if (window.showToast) showToast('Account created! Welcome aboard.', 'user-check');
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
