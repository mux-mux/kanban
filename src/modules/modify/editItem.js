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

  editButton.addEventListener('click', () => editItem(columnNum, itemNum));
  !isTouchDevice() && editButton.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouchDevice() && editButton.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  return editButton;
}

function editItemText(currentElement, columnNum, itemNum) {
  if (!currentElement || columnNum == undefined || itemNum == undefined) {
    throw new Error('editItemText function has no required argument value');
  }
  if (!isTouchDevice()) {
    currentElement.addEventListener('dblclick', editCurrentItem);
  } else {
    currentElement.addEventListener('touchend', detectDoubleTap());
  }

  function editCurrentItem(e) {
    removePomodoroTimerListiners();
    e.currentTarget.textContent = e.currentTarget.innerText;
    e.currentTarget.setAttribute('contentEditable', true);
    e.currentTarget.setAttribute('draggable', false);
    e.currentTarget.focus();

    focusCarretEnd(e);

    currentElement.addEventListener('blur', (e) => {
      e.currentTarget.setAttribute('contentEditable', false);
      e.currentTarget.setAttribute('draggable', true);
      editItem(columnNum, itemNum);
    });
  }

  function detectDoubleTap() {
    let lastTap = 0;
    let timeout;

    return function detectDoubleTapTimer(event) {
      const curTime = new Date().getTime();
      const tapLen = curTime - lastTap;
      if (tapLen < 500 && tapLen > 0) {
        editCurrentItem(event);
        event.preventDefault();
      } else {
        timeout = setTimeout(() => {
          clearTimeout(timeout);
        }, 500);
      }
      lastTap = curTime;
    };
  }

  function focusCarretEnd(ev) {
    const range = document.createRange();
    range.selectNodeContents(ev.currentTarget);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    onEnterBlur(ev);
  }

  function onEnterBlur(ev) {
    ev.currentTarget.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        ev.target.blur();
      }
    });
  }
}

export { editItem, createEditIcon, editItemText };
