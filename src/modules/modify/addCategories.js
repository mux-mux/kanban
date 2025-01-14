import { createFocusTrap } from 'focus-trap';
import { createElementWithClass, setProperties, isTouchDevice } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import { createDeleteIcon, deleteItem } from './deleteItem';
import { hoverAppearIcon } from '../set/createItem';
import { createEditIcon, editItemText } from './editItem';
import {
  setLocalCategories,
  getLocalCategories,
  getLocalItems,
  setLocalItems,
} from '../update/localStorage';

function renderCategories(categoriesList) {
  const categoriesContainer = document.getElementById('categoriesContainer');

  categoriesContainer.innerHTML = '';
  categoriesList.forEach((category, index) => {
    const itemElement = createElementWithClass('li', 'categories__item');
    itemElement.textContent = category;
    const categoryEditIcon = createEditIcon('category', index);
    const categoryDeleteIcon = createDeleteIcon('category', index);

    categoryDeleteIcon.addEventListener('click', () => {
      deleteItem('category', index);
    });

    itemElement.addEventListener('click', (e) => editItemText(e, 'category', index));

    if (!isTouchDevice()) {
      hoverAppearIcon(itemElement);
      setProperties(itemElement, { '--opacity': '0', '--pointer-events': 'none' });
    }

    itemElement.appendChild(categoryEditIcon);
    itemElement.appendChild(categoryDeleteIcon);
    categoriesContainer.appendChild(itemElement);
  });
}

function addCategories() {
  const buttonToggleCategoreis = document.querySelector('.tool-categories');
  const containerCategories = document.querySelector('.categories');
  const buttonCloseCategories = document.querySelector('.btn-close-category');
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

    const categoriesLoaded = getLocalCategories();
    const newCategoryName = categoryNameInput.value.trim();

    if (newCategoryName && !categoriesLoaded.includes(newCategoryName)) {
      categoriesLoaded.push(newCategoryName);
      setLocalCategories(categoriesLoaded);
      categoryNameInput.value = '';
      updateDOM();
    } else {
      alert('Category name already exists!');
    }
  });
}

function renderCategoriesSelector(columnNum, itemNum) {
  const itemsLoaded = getLocalItems();
  const categoriesLoaded = getLocalCategories();
  const categorySelector = createElementWithClass('select', 'categories__select');
  const selectedList = Object.keys(itemsLoaded)[columnNum];

  categorySelector.innerHTML = '<option value="" disabled selected>Select a category</option>';

  categoriesLoaded.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    option.selected = itemsLoaded[selectedList].items[itemNum].category === category;
    categorySelector.appendChild(option);
  });

  categorySelector.addEventListener('change', (e) => {
    const itemsLoadedOnChange = getLocalItems();
    const selectedCategory = e.target.value;

    itemsLoadedOnChange[selectedList].items[itemNum].category = selectedCategory;
    setLocalItems(itemsLoadedOnChange);

    updateDOM();
  });

  return categorySelector;
}

export { addCategories, renderCategories, renderCategoriesSelector };
