import checkFunctionParameters from '../errors/checkFunctionParameters';
import {
  createElementWithClass,
  isTouchDevice,
  toggleItemIconOpacity,
  restoreFocus,
  getFocusedElement,
} from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import { deleteItem } from './deleteItem';
import { removePomodoroTimerListiners } from '../set/pomodoro';
import {
  setLocalData,
  getLocalData,
  getLocalItems,
  setLocalItems,
  removeLocalData,
} from '../update/localStorage';

function editItem(type, columnNum, itemNum = 0) {
  checkFunctionParameters(type, columnNum);

  if (type === 'task') {
    const taskLists = document.querySelectorAll('.task__list');
    const itemsLoaded = getLocalItems();
    const selectedList = Object.keys(itemsLoaded)[columnNum];
    const selectedItem = taskLists[columnNum].children;

    if (selectedItem[itemNum].textContent === '') {
      deleteItem('task', columnNum, itemNum);
    } else {
      itemsLoaded[selectedList].items[itemNum].name = selectedItem[itemNum].textContent;
      setLocalItems(itemsLoaded);
    }
  } else if (type === 'category') {
    const categoriesLoaded = getLocalData('categoriesItems');
    const categoryEditedText =
      document.querySelectorAll('.categories__item')[columnNum].textContent;
    categoriesLoaded[columnNum] = categoryEditedText;
    setLocalData('categoriesItems', categoriesLoaded);
  }
  updateDOM();
}

function createEditIcon(type, columnNum, itemNum = 0) {
  checkFunctionParameters(type, columnNum);

  const editButton = createElementWithClass('button', ['icon', 'icon-edit']);
  const editIcon = createElementWithClass('i', ['fa-solid', 'fa-pencil']);

  if (type === 'task') {
    const itemsLoaded = getLocalItems();
    const taskText = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].name;
    editButton.setAttribute('aria-label', `Edit ${taskText} task name`);
  } else if (type === 'category') {
    const categoriesLoaded = getLocalData('categoriesItems');
    const categoryText = categoriesLoaded[columnNum];
    editButton.setAttribute('aria-label', `Edit ${categoryText} category name`);
  }

  editButton.appendChild(editIcon);

  !isTouchDevice() && editButton.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouchDevice() && editButton.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  return editButton;
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
      [lastFocusedParentId, lastFocusedClass] = getFocusedElement(e);
      setLocalData('isEdit', true);
      setLocalData('isPaused', true);
      removePomodoroTimerListiners();
      selectElement.innerHTML = '';
      element.setAttribute('draggable', false);
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
        restoreFocus(lastFocusedParentId, lastFocusedClass);
      } else if (type === 'category') {
        event.currentTarget.setAttribute('contentEditable', false);
        editItem('category', columnNum);
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
