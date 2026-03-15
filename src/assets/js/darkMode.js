// =========================================
// DARK MODE FUNCTIONALITY
// =========================================

const THEME_KEY = 'theme-preference';
const THEME_ATTR = 'data-theme';

export function initDarkMode() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;
  
  // Get initial theme
  const savedTheme = getTheme();
  setTheme(savedTheme);
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', toggleTheme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
}

function getTheme() {
  // Check localStorage first
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  
  // Fall back to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute(THEME_ATTR, theme);
  localStorage.setItem(THEME_KEY, theme);
  
  // Update toggle icon
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', 
      theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'
    );
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute(THEME_ATTR);
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

// Export for external use
export { getTheme, setTheme, toggleTheme };
