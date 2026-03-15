// =========================================
// MAIN ENTRY POINT
// =========================================

import { initDarkMode } from './darkMode.js';
import { initSearch } from './search.js';
import { initContactForm } from './contactForm.js';
import { initSocialShare } from './socialShare.js';
import { initMobileMenu } from './utils.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initSearch();
  initContactForm();
  initSocialShare();
  initMobileMenu();
  
  console.log('✨ Internet mais segura initialized');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
