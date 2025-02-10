function removeSpinner() {
  const appLoader = document.getElementById('app-loader');
  const noscript = document.getElementById('noscript');

  setTimeout(() => {
    appLoader.remove();
    noscript.remove();
  }, 500);
}

export default removeSpinner;
