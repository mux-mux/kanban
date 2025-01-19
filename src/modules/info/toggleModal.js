import { createFocusTrap } from 'focus-trap';

function toggleModal(container, closeButton, toggleButton) {
  const overlay = document.querySelector('.overlay');

  [toggleButton, closeButton].forEach((button) =>
    button.addEventListener('click', toggleModalVisibility)
  );

  const focusTrap = createFocusTrap(container, {
    onActivate: () => closeButton.focus(),
    onDeactivate: () => {
      closeButton.blur();
      container.classList.remove('modal__visible');
      overlay.classList.remove('overlay__visible');
    },
    allowOutsideClick: () => true,
    clickOutsideDeactivates: () => true,
  });

  function toggleModalVisibility() {
    const isOpened = container.classList.contains('modal__visible');

    if (!isOpened) {
      container.classList.add('modal__visible');
      overlay.classList.add('overlay__visible');
      focusTrap.activate();
    } else {
      focusTrap.deactivate();
    }
  }
}

export default toggleModal;
