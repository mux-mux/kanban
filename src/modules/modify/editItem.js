import checkFunctionParameters from '../errors/checkFunctionParameters';
import { createElementWithClass, isTouchDevice, toggleItemIconOpacity } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import { deleteItem } from './deleteItem';
import { removePomodoroTimerListiners } from '../set/pomodoro';
import {
  setLocalCategories,
  getLocalCategories,
  getLocalItems,
  setLocalItems,
} from '../update/localStorage';

function editItem(type = 'task', columnNum = 0, itemNum = 0) {
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
    const categoriesLoaded = getLocalCategories();
    const categoryEditedText =
      document.querySelectorAll('.categories__item')[columnNum].textContent;
    categoriesLoaded[columnNum] = categoryEditedText;
    setLocalCategories(categoriesLoaded);
  }
  updateDOM();
}

function createEditIcon(type, columnNum, itemNum = 0) {
  checkFunctionParameters(type, columnNum);

  const editButton = createElementWithClass('button', 'edit__icon');
  const editIcon = createElementWithClass('i', ['fa-solid', 'fa-pencil']);

  if (type === 'task') {
    const itemsLoaded = getLocalItems();
    const taskText = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].name;
    editButton.setAttribute('aria-label', `Edit ${taskText} task name`);
  } else if (type === 'category') {
    const categoriesLoaded = getLocalCategories();
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

  const taskListItem =
    type === 'task' ? e.target.closest('.task__list-item') : e.target.closest('.categories__item');
  const selectElement = type === 'task' && taskListItem.querySelector('.categories__select');

  if (e.target.classList.contains('edit__icon') || e.target.classList.contains('fa-pencil')) {
    if (taskListItem) {
      editCurrentItem(taskListItem);
    }
  }

  function editCurrentItem(element) {
    if (type === 'task') {
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
