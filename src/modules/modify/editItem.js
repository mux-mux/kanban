import { createElementWithClass, isTouchDevice, toggleItemIconOpacity } from '../helpers/helpers';
import { columnNames } from '../data/columns';
import { updateDOM, itemsLoaded, categoriesLoaded } from '../update/updateDOM';
import { taskLists } from './addItem';
import { deleteItem } from './deleteItem';
import { removePomodoroTimerListiners } from '../set/pomodoro';

function editItem(type = 'task', columnNum = 0, itemNum = 0) {
  if (type === 'task') {
    const selectedList = columnNames[columnNum];
    const selectedItem = taskLists[columnNum].children;

    if (selectedItem[itemNum].textContent === '') {
      deleteItem('task', columnNum, itemNum);
    } else {
      itemsLoaded[selectedList].items[itemNum].name = selectedItem[itemNum].textContent;
    }
  } else if (type === 'category') {
    const categoryEditedText =
      document.querySelectorAll('.categories__item')[columnNum].textContent;
    categoriesLoaded[columnNum] = categoryEditedText;
  }
  updateDOM();
}

function createEditIcon(type = 'task', columnNum = 0, itemNum = 0) {
  if (columnNum == undefined || itemNum == undefined) {
    throw new Error('createEditIcon function has no required argument value');
  }

  const editButton = createElementWithClass('button', 'edit__icon');
  const editIcon = createElementWithClass('i', ['fa-solid', 'fa-pencil']);

  if (type === 'task') {
    const taskText = itemsLoaded[columnNames[columnNum]].items[itemNum].name;
    editButton.setAttribute('aria-label', `Edit ${taskText} task name`);
  } else if (type === 'category') {
    const categoryText = categoriesLoaded[columnNum];
    editButton.setAttribute('aria-label', `Edit ${categoryText} category name`);
  }

  editButton.appendChild(editIcon);

  !isTouchDevice() && editButton.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouchDevice() && editButton.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  return editButton;
}

function editItemText(e, type = 'task', columnNum = 0, itemNum = 0) {
  const taskListItem =
    type === 'task' ? e.target.closest('.task__list-item') : e.target.closest('.categories__item');
  const selectElement = type === 'task' && taskListItem.querySelector('.categories__select');

  if (columnNum == undefined || itemNum == undefined) {
    throw new Error('editItemText function has no required argument value');
  }

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
