import { createFocusTrap } from 'focus-trap';
import { createElementWithClass } from '../set/createItem';

function addCategories() {
  const buttonToggleCategoreis = document.querySelector('.tool-categories');
  const containerCategories = document.querySelector('.categories');
  const buttonCloseCategories = document.querySelector('.categories__close');

  buttonToggleCategoreis.addEventListener('click', toggleCategoriesVisibility);
  buttonCloseCategories.addEventListener('click', toggleCategoriesVisibility);

  const focusTrap = createFocusTrap(containerCategories, {
    onActivate: () => buttonCloseCategories.focus(),
    onDeactivate: () => {
      buttonCloseCategories.blur();
      containerCategories.classList.remove('categories__visible');
    },
    allowOutsideClick: () => true,
    clickOutsideDeactivates: () => true,
  });

  function toggleCategoriesVisibility() {
    const isOpened = containerCategories.classList.contains('categories__visible');

    if (!isOpened) {
      containerCategories.classList.add('categories__visible');
      focusTrap.activate();
    } else {
      focusTrap.deactivate();
    }
  }
}

export { addCategories };
