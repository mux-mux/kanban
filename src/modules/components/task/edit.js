import checkFunctionParameters from '../../errors/errors';
import {
  createElementWithClass,
  isTouchDevice,
  toggleItemIconOpacity,
  restoreFocus,
  getFocusedElement,
} from '../../helpers/helpers';
import updateDOM from '../../update/updateDOM';
import { deleteItem } from './delete';
import { removePomodoroTimerListiners } from '../pomodoro';
import {
  setLocalData,
  getLocalData,
  getLocalItems,
  setLocalItems,
  removeLocalData,
} from '../../update/localStorage';

function editItem(type, columnNum, itemNum = 0) {
  checkFunctionParameters(type, columnNum);

  if (type === 'task') {
    handleTaskEdit(columnNum, itemNum);
  } else if (type === 'category') {
    handleCategoryEdit(columnNum);
  }

  updateDOM();
}

function handleTaskEdit(columnNum, itemNum) {
  const taskLists = document.querySelectorAll('.task__list');
  const itemsLoaded = getLocalItems();
  const selectedList = Object.keys(itemsLoaded)[columnNum];
  const selectedItem = taskLists[columnNum].children;

  if (!selectedItem) return;

  if (selectedItem[itemNum].textContent.trim() === '') {
    deleteItem('task', columnNum, itemNum);
  } else {
    itemsLoaded[selectedList].items[itemNum].name = selectedItem[itemNum].textContent.trim();
    setLocalItems(itemsLoaded);
  }
}

function handleCategoryEdit(columnNum) {
  const categoriesLoaded = getLocalData('categoriesItems');
  const categoryText = document
    .querySelectorAll('.categories__item')
    [columnNum]?.textContent.trim();
  if (!categoryText) return;

  categoriesLoaded[columnNum] = categoryText;
  setLocalData('categoriesItems', categoriesLoaded);
}

function createEditIcon(type, columnNum, itemNum = 0) {
  checkFunctionParameters(type, columnNum);

  const editButton = createElementWithClass('button', ['icon', 'icon-edit']);
  const editIcon = createElementWithClass('i', ['fa-solid', 'fa-pencil']);
  editButton.appendChild(editIcon);

  editButton.ariaLabel = getAriaLabel(type, columnNum, itemNum);
  addHoverEffects(editButton);

  return editButton;
}

function getAriaLabel(type, columnNum, itemNum) {
  if (type === 'task') {
    const itemsLoaded = getLocalItems();
    const taskName =
      itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum]?.name || 'current';
    return `Edit the ${taskName} task name`;
  } else if (type === 'category') {
    const categoriesLoaded = getLocalData('categoriesItems');
    const categoryName = categoriesLoaded[columnNum] || 'current';
    return `Edit the ${categoryName} category name`;
  }
}

function addHoverEffects(button) {
  if (!isTouchDevice()) {
    button.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
    button.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));
  }
}

function editItemText(e, type, columnNum, itemNum = 0) {
  checkFunctionParameters(type, columnNum);

  const taskListItem = getEditableElement(e, type);
  if (!taskListItem) return;

  const [lastFocusedParentId, lastFocusedClass] = getFocusedElement(e, type);

  if (e.target.classList.contains('icon-edit') || e.target.classList.contains('fa-pencil')) {
    editCurrentItem(taskListItem, type, columnNum, itemNum, lastFocusedParentId, lastFocusedClass);
  }
}

function editCurrentItem(element, type, columnNum, itemNum, lastFocusedParentId, lastFocusedClass) {
  if (type === 'task') {
    setLocalData('isEdit', true);
    setLocalData('isPaused', true);
    removePomodoroTimerListiners();
    const selectElement = type === 'task' && element.querySelector('.categories__select');
    selectElement.innerHTML = '';
    element.setAttribute('draggable', false);
    element.style.paddingTop = '5px';
  }

  element.textContent = element.innerText;
  element.setAttribute('contentEditable', true);
  element.focus();

  moveCaretToEnd(element);

  element.addEventListener('blur', () => {
    finalizeEdit(element, type, columnNum, itemNum);
    restoreFocus(lastFocusedParentId, lastFocusedClass, type);
  });
}

function getEditableElement(e, type) {
  const selector = type === 'task' ? '.task__list-item' : '.categories__item';
  return e.target.closest(selector);
}

function finalizeEdit(element, type, columnNum, itemNum) {
  if (type === 'task') {
    element.setAttribute('draggable', true);
    element.style.paddingTop = 0;
    editItem('task', columnNum, itemNum);
    removeLocalData('isEdit');
  } else if (type === 'category') {
    element.setAttribute('contentEditable', false);
    editItem('category', columnNum);
  }
}

function moveCaretToEnd(element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  enableEnterToBlur(element);
}

function enableEnterToBlur(element) {
  element.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      element.blur();
    }
  });
}

export { editItem, createEditIcon, editItemText };
