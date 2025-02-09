import checkFunctionParameters from '../../errors/errors';
import {
  createElementWithClass,
  isTouchDevice,
  toggleItemIconOpacity,
  restoreFocus,
  getFocusedElement,
  checkIncludesName,
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

import { MAX_LENGTH_TASK, MAX_LENGTH_CATEGORY } from '../../../constants';

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

function createEditButtons(type) {
  const container = createElementWithClass('div', ['edit-icons-container']);
  const acceptButton = createElementWithClass('button', [
    'btn',
    'btn-add',
    'btn-accept',
    'btn-edit',
    `btn-edit-${type}`,
  ]);
  const acceptIcon = createElementWithClass('i', ['fa-solid', 'fa-check']);
  acceptButton.setAttribute('contenteditable', 'false');
  const discardButton = createElementWithClass('button', [
    'btn',
    'btn-close',
    'btn-discard',
    'btn-edit',
    `btn-edit-${type}`,
  ]);
  const discardIcon = createElementWithClass('i', ['fa-solid', 'fa-xmark']);
  discardButton.setAttribute('contenteditable', 'false');
  acceptButton.appendChild(acceptIcon);
  discardButton.appendChild(discardIcon);
  container.append(acceptButton, discardButton);

  return container;
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

function limitConteEditableLength(type, defaultText) {
  const editableElem = document.querySelector("[contenteditable='true']");
  const maxLength = type === 'task' ? MAX_LENGTH_TASK : MAX_LENGTH_CATEGORY;

  editableElem.addEventListener('input', () => {
    let text = editableElem.innerText;
    setLocalData('isChanged', true);

    if (text.length === 0) {
      editableElem.innerHTML = '<br>';
      appendEditButtons(editableElem, type, defaultText);
    }
    if (text.length > maxLength) {
      editableElem.innerText = text.substring(0, maxLength);
      moveCaretToEnd(editableElem, text);
      appendEditButtons(editableElem, type, defaultText);
    }
  });
  editableElem.addEventListener('paste', (event) => {
    const pasteText = (event.clipboardData || window.Clipboard).getData('text');
    const newText = editableElem.textContent + pasteText;
    if (newText.length > MAX_LENGTH_TASK) {
      event.preventDefault();
      alert(`You can only paste up to ${MAX_LENGTH_TASK} characters.`);
    }
  });
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
    pausePomodoroIfActive(columnNum, itemNum);
    setLocalData('isEdit', true);
    removePomodoroTimerListiners();
    setInnerHeight(element);
    const selectElement = type === 'task' && element.querySelector('.categories__select');
    selectElement.innerHTML = '';
    element.setAttribute('draggable', false);
    element.style.paddingTop = '5px';
  }

  const defaultText = element.innerText;

  element.textContent = element.innerText;
  element.setAttribute('contentEditable', true);
  element.focus();
  limitConteEditableLength(type, defaultText);

  moveCaretToEnd(element, defaultText);

  if (isTouchDevice()) {
    appendEditButtons(element, type, defaultText);
  }

  element.addEventListener('blur', () => {
    finalizeEdit(element, type, columnNum, itemNum, defaultText);
    restoreFocus(lastFocusedParentId, lastFocusedClass, type);
    removeLocalData('isChanged');
  });
}

function appendEditButtons(element, type, defaultText) {
  const taskEditButtons = createEditButtons(type);
  element.appendChild(taskEditButtons);

  document.querySelector('.btn-discard').addEventListener('mousedown', (event) => {
    event.preventDefault();
    setLocalData('isDismiss', true);
    restoreDefaultText(element, defaultText);
    element.setAttribute('contenteditable', 'false');
  });
}

function pausePomodoroIfActive(columnNum, itemNum) {
  const itemsLoaded = getLocalItems();
  const pomodoroState = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].pomodoro;
  pomodoroState === true && setLocalData('isPaused', true);
}

function setInnerHeight(element) {
  element.style.height = 'auto';
  const rect = element.getBoundingClientRect();
  element.style.minHeight = rect.height + 'px';
}

function getEditableElement(e, type) {
  const selector = type === 'task' ? '.task__list-item' : '.categories__item';
  return e.target.closest(selector);
}

function finalizeEdit(element, type, columnNum, itemNum, defaultText) {
  function updateCategoriesNames(defaultText, newCategoryName) {
    const itemsLoaded = getLocalItems();
    const columnNames = getLocalData('columnNames');
    let updated = false;

    columnNames.forEach((column) => {
      itemsLoaded[column].items.forEach((item) => {
        if (item.category === defaultText) {
          item.category = newCategoryName;
          updated = true;
        }
      });
    });
    updated && setLocalItems(itemsLoaded);
  }

  if (type === 'task') {
    element.setAttribute('draggable', true);
    element.style.paddingTop = 0;
    editItem('task', columnNum, itemNum);
    removeLocalData('isEdit');
  } else if (type === 'category') {
    const isChanged = getLocalData('isChanged');
    const isDismiss = getLocalData('isDismiss');
    element.setAttribute('contentEditable', false);
    const newCategoryName = element.innerText.trim();
    const categoriesLoaded = getLocalData('categoriesItems');

    if (!newCategoryName) return;

    if (!isDismiss && isChanged && checkIncludesName(newCategoryName, categoriesLoaded)) {
      alert('Category name already exists!');
      restoreDefaultText(element, defaultText);
      updateDOM();
      return;
    }

    updateCategoriesNames(defaultText, newCategoryName);
    editItem('category', columnNum);
    isChanged && removeLocalData('isChanged');
    isDismiss && removeLocalData('isDismiss');
  }
}

function moveCaretToEnd(element, defaultText) {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  enableBlurOnKeyPress(element, defaultText);
}

function enableBlurOnKeyPress(element, defaultText) {
  element.addEventListener('keydown', handleKeyPress);

  function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      if (event.key === 'Escape') {
        setLocalData('isDismiss', true);
        restoreDefaultText(element, defaultText);
      }
      element.blur();
    }
  }
}

function restoreDefaultText(element, defaultText) {
  element.textContent = defaultText;
}

export { editItem, createEditIcon, createEditButtons, editItemText };
