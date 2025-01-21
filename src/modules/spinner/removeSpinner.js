function removeSpinner() {
  const appRoot = document.getElementById('app');
  const appLoader = document.getElementById('app-loader');

  setTimeout(() => appLoader.remove(), 500);
  appRoot.style.visibility = 'visible';
  appRoot.style.opacity = '1';
}

export default removeSpinner;
