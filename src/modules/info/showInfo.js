import toggleModal from '../modify/toggleModal';

function setInfoModalListeners() {
  const containerInfo = document.querySelector('.modal-info');
  const buttonCloseInfo = document.querySelector('.btn-close-info');
  const buttonToggleInfo = document.querySelector('.tool-info');

  toggleModal(containerInfo, buttonCloseInfo, buttonToggleInfo);
}

export { setInfoModalListeners };
