import {
  createElementWithClass,
  setProperties,
  isTouchDevice,
  restoreFocus,
  getFocusedElement,
  checkIncludesName,
} from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import { createDeleteIcon, deleteItem } from './task/delete';
import { hoverAppearIcon } from './task/create';
import { createEditIcon, editItemText } from './task/edit';
import toggleModal from './modal';
import { setLocalData, getLocalData, getLocalItems, setLocalItems } from '../update/localStorage';

function renderCategories(categoriesList) {
  const categoriesContainer = document.getElementById('categoriesContainer');
  categoriesContainer.innerHTML = '';

  categoriesList.forEach((category, index) => {
    const categoryItem = createCategoryItem(category, index);
    categoriesContainer.appendChild(categoryItem);
  });
}

function createCategoryItem(category, index) {
  const itemElement = createElementWithClass('li', 'categories__item');
  const categoriesIcons = createElementWithClass('div', 'categories__icons');
  itemElement.textContent = category;
  itemElement.setAttribute('data-id', index);

  const categoryEditIcon = createEditIcon('category', index);
  const categoryDeleteIcon = createDeleteIcon('category', index);

  categoryDeleteIcon.addEventListener('click', () => deleteItem('category', index));
  itemElement.addEventListener('click', (e) => editItemText(e, 'category', index));

  if (!isTouchDevice()) {
    hoverAppearIcon(itemElement);
    setProperties(itemElement, { '--opacity': '0', '--pointer-events': 'none' });
  }

  categoriesIcons.append(categoryEditIcon, categoryDeleteIcon);
  itemElement.appendChild(categoriesIcons);

  return itemElement;
}

function addCategories() {
  const containerCategories = document.querySelector('.modal-categories');
  const buttonCloseCategories = document.querySelector('.btn-close-category');
  const buttonToggleCategories = document.querySelector('.tool-categories');
  const categoryForm = document.getElementById('categoryForm');

  toggleModal(containerCategories, buttonCloseCategories, buttonToggleCategories);
  categoryForm.addEventListener('submit', handleCategorySubmit);
}

function handleCategorySubmit(event) {
  event.preventDefault();
  const categoryNameInput = document.getElementById('categoryName');
  const newCategoryName = categoryNameInput.value.trim();
  const categoriesLoaded = getLocalData('categoriesItems');

  if (!newCategoryName) return;

  if (checkIncludesName(newCategoryName, categoriesLoaded)) {
    alert('Category name already exists!');
    return;
  }

  categoriesLoaded.push(newCategoryName);
  setLocalData('categoriesItems', categoriesLoaded);
  categoryNameInput.value = '';
  updateDOM();
}

function renderCategoriesSelector(columnNum, itemNum) {
  const itemsLoaded = getLocalItems();
  const categoriesLoaded = getLocalData('categoriesItems');
  const selectedList = Object.keys(itemsLoaded)[columnNum];
  const currentItem = itemsLoaded[selectedList].items[itemNum];

  const categorySelector = createCategorySelector(currentItem, categoriesLoaded);
  categorySelector.addEventListener('change', (e) =>
    handleCategoryChange(e, selectedList, itemNum)
  );

  return categorySelector;
}

function createCategorySelector(currentItem, categoriesLoaded) {
  const categorySelector = createElementWithClass('select', 'categories__select');
  categorySelector.innerHTML = '<option value="" disabled selected>Select a category</option>';
  categorySelector.ariaLabel = `Change the category for the ${currentItem.name} task`;

  categoriesLoaded.forEach((category) => {
    const option = createElementWithClass('option', 'categories__select-option');
    option.value = category;
    option.textContent = category;
    option.selected = currentItem.category === category;
    categorySelector.appendChild(option);
  });

  return categorySelector;
}

function handleCategoryChange(event, selectedList, itemNum) {
  const itemsLoaded = getLocalItems();
  const selectedCategory = event.target.value;
  const [lastFocusedParentId, lastFocusedClass] = getFocusedElement(event);

  itemsLoaded[selectedList].items[itemNum].category = selectedCategory;
  setLocalItems(itemsLoaded);
  updateDOM();
  restoreFocus(lastFocusedParentId, lastFocusedClass);
}

export { addCategories, renderCategories, renderCategoriesSelector };
