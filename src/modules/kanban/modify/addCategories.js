import { updateDOM, categoriesLoaded } from '../update/updateDOM';
import { createFocusTrap } from 'focus-trap';
import { categories } from '../data/categories';

function renderCategories(categoriesList) {
  const categoriesContainer = document.getElementById('categoriesContainer');

  categoriesContainer.innerHTML = '';
  categoriesList.forEach((category) => {
    const itemElement = document.createElement('li');
    itemElement.textContent = category;
    categoriesContainer.appendChild(itemElement);
  });
}

function addCategories() {
  const buttonToggleCategoreis = document.querySelector('.tool-categories');
  const containerCategories = document.querySelector('.categories');
  const buttonCloseCategories = document.querySelector('.categories__close');
  const categoryForm = document.getElementById('categoryForm');
  const categoryNameInput = document.getElementById('categoryName');

  buttonToggleCategoreis.addEventListener('click', toggleCategoriesVisibility);
  buttonCloseCategories.addEventListener('click', toggleCategoriesVisibility);

  const focusTrap = createFocusTrap(containerCategories, {
    onActivate: () => buttonCloseCategories.focus(),
    onDeactivate: () => {
      buttonCloseCategories.blur();
      containerCategories.classList.remove('categories__visible');
    },
    allowOutsideClick: () => true,
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

  categoryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newCategoryName = categoryNameInput.value.trim();
    if (newCategoryName && !categories.items.includes(newCategoryName)) {
      categoriesLoaded.push(newCategoryName);
      categories.items = categories.items.concat(newCategoryName);

      categoryNameInput.value = '';

      updateDOM();
      renderCategories(categoriesLoaded);
    } else {
      alert('Category name already exists!');
    }
  });
}

export { addCategories, renderCategories };
