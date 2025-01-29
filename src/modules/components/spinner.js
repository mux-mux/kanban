function removeSpinner() {
  const appLoader = document.getElementById('app-loader');

  setTimeout(() => appLoader.remove(), 500);
}

export default removeSpinner;
