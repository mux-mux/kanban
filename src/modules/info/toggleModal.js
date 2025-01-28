import { createFocusTrap } from 'focus-trap';
import checkFunctionParameters from '../errors/checkFunctionParameters';

function toggleModal(container, buttonClose, buttonToggle) {
  checkFunctionParameters(container, buttonClose, buttonToggle);
  const overlay = document.querySelector('.overlay');

  const focusTrap = createFocusTrap(container, {
    onActivate: () => buttonClose.focus(),
    onDeactivate: () => {
      buttonClose.blur();
      container.classList.remove('modal__visible');
      overlay.classList.remove('overlay__visible');
    },
    allowOutsideClick: () => true,
    clickOutsideDeactivates: () => true,
  });

  [buttonToggle, buttonClose].forEach((button) =>
    button.addEventListener('click', toggleModalVisibility)
  );

  function toggleModalVisibility() {
    const isOpened = container.classList.contains('modal__visible');
    setModalVisibility(!isOpened);

    !isOpened ? focusTrap.activate() : focusTrap.deactivate();
  }

  function setModalVisibility(isVisible) {
    checkFunctionParameters(isVisible);
    container.classList.toggle('modal__visible', isVisible);
    overlay.classList.toggle('overlay__visible', isVisible);
  }
}

export default toggleModal;
