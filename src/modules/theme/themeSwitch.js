function switchTheme() {
  const themeSlider = document.querySelector('input.theme-checkbox');

  const THEME_DARK = 'theme-dark';
  const THEME_LIGHT = 'theme-light';

  function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
    themeSlider.checked = theme === THEME_DARK;
  }

  function setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (event) => {
      setTheme(event.matches ? THEME_DARK : THEME_LIGHT);
    });
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark ? THEME_DARK : THEME_LIGHT);
    }
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem('theme');
    setTheme(currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
  }

  function setupEventListeners() {
    themeSlider.addEventListener('change', toggleTheme);
  }

  function init() {
    initializeTheme();
    setupSystemThemeListener();
    setupEventListeners();
  }

  init();
}

export { switchTheme };
