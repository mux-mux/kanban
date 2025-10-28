import toggleModal from './modal';

function setInfoModalListeners() {
  const container = document.querySelector('.modal-info');
  const buttonClose = document.querySelector('.btn-close-info');
  const buttonToggle = document.querySelector('.tool-info');

  toggleModal(container, buttonClose, buttonToggle);
}

export default setInfoModalListeners;
