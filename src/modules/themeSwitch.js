const themeSlider = document.querySelector('input[type="checkbox"]');

function switchTheme(event) {
  event.currentTarget.checked ? setTheme('dark') : setTheme('light');
}

themeSlider.addEventListener('change', switchTheme);

function getTheme() {
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
      themeSlider.checked = true;
    }
  } else {
    setTheme('light');
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export { getTheme };
