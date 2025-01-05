import { createElementWithClass, isTouchDevice, toggleItemIconOpacity } from '../helpers/helpers';
import { columnNames } from '../data/columns';
import { updateDOM, localLoaded } from '../update/updateDOM';
import { taskLists } from './addItem';
import { deleteItem } from './deleteItem';
import { removePomodoroTimerListiners } from '../set/pomodoro';

function editItem(columnNum, itemNum) {
  const selectedList = columnNames[columnNum];
  const selectedItem = taskLists[columnNum].children;

  if (selectedItem[itemNum].textContent === '') {
    deleteItem(columnNum, itemNum);
  } else {
    localLoaded[selectedList].items[itemNum].name = selectedItem[itemNum].textContent;
  }
  updateDOM();
}

function createEditIcon(columnNum, itemNum) {
  if (columnNum == undefined || itemNum == undefined) {
    throw new Error('createEditIcon function has no required argument value');
  }

  const editButton = createElementWithClass('button', 'edit__icon');
  const editIcon = createElementWithClass('i', ['fa-solid', 'fa-pencil']);

  const taskText = localLoaded[columnNames[columnNum]].items[itemNum].name;
  editButton.setAttribute('aria-label', `Edit ${taskText} task`);

  editButton.appendChild(editIcon);

  !isTouchDevice() && editButton.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouchDevice() && editButton.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  return editButton;
}

function editItemText(e, columnNum, itemNum) {
  const taskListItem = e.target.closest('.task__list-item');

  if (columnNum == undefined || itemNum == undefined) {
    throw new Error('editItemText function has no required argument value');
  }

  if (e.target.classList.contains('edit__icon') || e.target.classList.contains('fa-pencil')) {
    if (taskListItem) {
      editCurrentItem(taskListItem);
    }
  }

  function editCurrentItem(element) {
    removePomodoroTimerListiners();
    element.textContent = element.innerText;
    element.setAttribute('contentEditable', true);
    element.setAttribute('draggable', false);
    element.focus();

    focusCarretEnd(element);

    element.addEventListener('blur', (event) => {
      event.currentTarget.setAttribute('contentEditable', false);
      event.currentTarget.setAttribute('draggable', true);
      editItem(columnNum, itemNum);
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
