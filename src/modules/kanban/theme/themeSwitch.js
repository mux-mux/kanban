function switchTheme() {
  const themeSlider = document.querySelector('input.theme-checkbox');

  function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;

    theme === 'theme-dark'
      ? themeSlider.setAttribute('checked', 'checked')
      : themeSlider.removeAttribute('checked');
  }

  function getTheme() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      event.matches ? setTheme('theme-dark') : setTheme('theme-light');
    });

    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else {
      setTheme('theme-light');
    }
  }

  function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
    } else {
      setTheme('theme-dark');
    }
  }

  themeSlider.addEventListener('change', toggleTheme);

  getTheme();
}

export { switchTheme };
