import toggleModal from './toggleModal';
import checkFunctionParameters from '../errors/checkFunctionParameters';

function setInfoModalListeners() {
  const container = document.querySelector('.modal-info');
  const buttonClose = document.querySelector('.btn-close-info');
  const buttonToggle = document.querySelector('.tool-info');
  checkFunctionParameters(container, buttonClose, buttonToggle);

  toggleModal(container, buttonClose, buttonToggle);
}

export { setInfoModalListeners };
