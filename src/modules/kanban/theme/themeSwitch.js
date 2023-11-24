const themeSlider = document.querySelector('input.theme-checkbox');

function switchTheme(event) {
  event.currentTarget.checked ? setTheme('theme-dark') : setTheme('theme-light');
}

themeSlider.addEventListener('change', switchTheme);

function getTheme() {
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.className = currentTheme;

    currentTheme === 'theme-dark' ? (themeSlider.checked = true) : setTheme('theme-light');
  }
}

function setTheme(theme) {
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
}

export { getTheme };
