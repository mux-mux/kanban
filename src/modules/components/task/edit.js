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

  let lastFocusedParentId, lastFocusedClass;
  const taskListItem =
    type === 'task' ? e.target.closest('.task__list-item') : e.target.closest('.categories__item');
  const selectElement = type === 'task' && taskListItem.querySelector('.categories__select');

  if (e.target.classList.contains('icon-edit') || e.target.classList.contains('fa-pencil')) {
    if (taskListItem) {
      editCurrentItem(taskListItem);
    }
  }

  function editCurrentItem(element) {
    if (type === 'task') {
      [lastFocusedParentId, lastFocusedClass] = getFocusedElement(e, 'task');
      setLocalData('isEdit', true);
      setLocalData('isPaused', true);
      removePomodoroTimerListiners();
      selectElement.innerHTML = '';
      element.setAttribute('draggable', false);
    } else if (type === 'category') {
      [lastFocusedParentId, lastFocusedClass] = getFocusedElement(e, 'category');
    }

    element.textContent = element.innerText;
    element.setAttribute('contentEditable', true);
    element.focus();

    focusCarretEnd(element);

    element.addEventListener('blur', (event) => {
      if (type === 'task') {
        event.currentTarget.setAttribute('draggable', true);
        editItem('task', columnNum, itemNum);
        removeLocalData('isEdit');
        restoreFocus(lastFocusedParentId, lastFocusedClass, 'task');
      } else if (type === 'category') {
        event.currentTarget.setAttribute('contentEditable', false);
        editItem('category', columnNum);
        restoreFocus(lastFocusedParentId, lastFocusedClass, 'category');
      }
    });
  }

  function focusCarretEnd(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    onEnterBlur(element);
  }

  function onEnterBlur(element) {
    element.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        element.blur();
      }
    });
  }
}

export { editItem, createEditIcon, editItemText };
