import { createFocusTrap } from 'focus-trap';
import { createElementWithClass } from '../helpers/helpers';
import { updateDOM, categoriesLoaded, itemsLoaded } from '../update/updateDOM';
import { categories } from '../data/categories';
import { columnNames } from '../data/columns';

function renderCategories(categoriesList) {
  const categoriesContainer = document.getElementById('categoriesContainer');

  categoriesContainer.innerHTML = '';
  categoriesList.forEach((category) => {
    const itemElement = createElementWithClass('li', 'categories__item');
    itemElement.textContent = category;
    categoriesContainer.appendChild(itemElement);
  });
}

function addCategories() {
  const buttonToggleCategoreis = document.querySelector('.tool-categories');
  const containerCategories = document.querySelector('.categories');
  const buttonCloseCategories = document.querySelector('.categories__button-close');
  const categoryForm = document.getElementById('categoryForm');
  const categoryNameInput = document.getElementById('categoryName');
  const overlay = document.querySelector('.overlay');

  [buttonToggleCategoreis, buttonCloseCategories].forEach((button) =>
    button.addEventListener('click', toggleCategoriesModal)
  );

  const focusTrap = createFocusTrap(containerCategories, {
    onActivate: () => buttonCloseCategories.focus(),
    onDeactivate: () => {
      buttonCloseCategories.blur();
      containerCategories.classList.remove('categories__visible');
      overlay.classList.remove('overlay__visible');
    },
    allowOutsideClick: () => true,
    clickOutsideDeactivates: () => true,
  });

  function toggleCategoriesModal() {
    const isOpened = containerCategories.classList.contains('categories__visible');

    if (!isOpened) {
      containerCategories.classList.add('categories__visible');
      overlay.classList.add('overlay__visible');
      focusTrap.activate();
    } else {
      focusTrap.deactivate();
    }
  }

  categoryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newCategoryName = categoryNameInput.value.trim();
    if (newCategoryName && !categoriesLoaded.includes(newCategoryName)) {
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

function renderCategoriesSelector(columnNum, itemNum) {
  const categorySelector = createElementWithClass('select', 'categories__select');
  const selectedList = columnNames[columnNum];

  categorySelector.innerHTML = '<option value="" disabled selected>Select a category</option>';

  categoriesLoaded.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    option.selected = itemsLoaded[selectedList].items[itemNum].category === category;
    categorySelector.appendChild(option);
  });

  categorySelector.addEventListener('change', (e) => {
    const selected = e.target.value;

    itemsLoaded[selectedList].items[itemNum].category = selected;

    updateDOM();
  });

  return categorySelector;
}

export { addCategories, renderCategories, renderCategoriesSelector };
