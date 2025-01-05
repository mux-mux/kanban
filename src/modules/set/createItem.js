import {
  setProperties,
  createElementWithClass,
  isTouchDevice,
  toggleItemIconOpacity,
} from '../helpers/helpers';
import { editItemText, createEditIcon } from '../modify/editItem';
import { deleteItem } from '../modify/deleteItem';
import { setDeadline } from './deadline';
import { dragItem } from '../modify/dragDropItem';
import { createPomodoroStartIcon, pomodoroInit } from './pomodoro';
import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { relocateItem } from '../modify/relocateItem';
import { taskLists } from '../modify/addItem';

let pomodoroIcon = null;
let moveData = {};

function createItem(columnElement, columnNum, item, itemNum) {
  if (!columnElement || columnNum == undefined || !item || itemNum == undefined) {
    throw new Error('startPomodoro function has no required argument value');
  }

  const taskContainer = createElementWithClass('li', 'task__list-item');
  const taskManagment = createElementWithClass('div', 'task__set-container');
  const taskRemoveIcon = createElementWithClass('img', 'task__list-item-remove-img');
  const taskRemoveArea = createElementWithClass('button', 'task__list-item-remove');
  const taskSessions = createElementWithClass('ul', 'pomodoro__sessions');

  pomodoroIcon = createPomodoroStartIcon(columnNum, itemNum);
  const editIcon = createEditIcon(columnNum, itemNum);
  const deadlinePick = setDeadline(columnNum, item, itemNum);

  const itemData = localLoaded[columnNames[columnNum]].items[itemNum];

  for (let i = 0; i < itemData.sessions; i++) {
    appendSessionIcon(taskSessions, i);
  }

  if (itemData.pomodoro === true) {
    pomodoroInit(pomodoroIcon, itemData, 'init', columnNum, itemNum);
  }

  changeIconOnBreak(itemData, pomodoroIcon);

  taskRemoveIcon.src = './assets/remove.png';
  taskRemoveIcon.alt = 'remove element icon';

  taskRemoveArea.setAttribute('aria-label', `Move to trash ${itemData.name} task`);
  taskRemoveArea.addEventListener('click', () => {
    pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
    deleteItem(columnNum, itemNum);
    moveData = {};
  });
  !isTouchDevice() && taskRemoveArea.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouchDevice() && taskRemoveArea.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  setElementAttributes(taskContainer, item.name, true, itemNum);

  if (columnNum !== 2) {
    taskManagment.appendChild(pomodoroIcon.pomodoro);
    taskManagment.appendChild(editIcon);
  }

  taskContainer.addEventListener('click', (e) => editItemText(e, columnNum, itemNum));

  taskRemoveArea.appendChild(taskRemoveIcon);
  taskManagment.appendChild(deadlinePick);
  taskManagment.appendChild(taskRemoveArea);
  taskContainer.appendChild(taskSessions);
  taskContainer.appendChild(taskManagment);
  columnElement.appendChild(taskContainer);

  if (!isTouchDevice()) {
    taskContainer.addEventListener('dragstart', (e) => dragItem(e, columnNum));
    hoverAppearIcon(taskContainer);
  } else {
    taskLists.forEach((item) => {
      setProperties(item, { '--opacity': '1', '--pointer-events': 'auto' });
    });

    taskContainer.addEventListener(
      'touchstart',
      (e) => {
        document
          .querySelectorAll('.task__list-item')
          .forEach((item) => item.classList.remove('touch__selected'));
        if (e.target.classList.contains('task__list-item')) {
          e.target.classList.add('touch__selected');
        }
        moveData.columnNum = columnNum;
        moveData.itemNum = +e.currentTarget.attributes['data-in-list'].value;
      },
      { passive: true }
    );
  }
}

document.querySelectorAll('.btn-move').forEach((taskMoveButton, index) => {
  if (isTouchDevice()) {
    taskMoveButton.style.display = 'block';
  }
  taskMoveButton.addEventListener(
    'touchstart',
    () => {
      const newColumnNum = moveData.columnNum != index ? index : index + 1;
      moveData.newColumnNum = newColumnNum;
      moveData.newItemnNum = localLoaded[columnNames[newColumnNum]].items.length;
      if (moveData.columnNum !== undefined) {
        relocateItem(
          moveData.columnNum,
          moveData.itemNum,
          moveData.newColumnNum,
          moveData.newItemnNum
        );
        moveData = {};
      }
    },
    { passive: true }
  );
});

function appendSessionIcon(container, num) {
  if (!container || num == undefined) {
    throw new Error('appendSessionIcon function has no required argument value');
  }

  const sessionElement = createElementWithClass('li', 'pomodoro__session');
  sessionElement.style.left = 12 * num + 'px';
  container.appendChild(sessionElement);
}

function setElementAttributes(element, text, isDraggable, num) {
  if (!element || text == undefined || isDraggable == undefined || num == undefined) {
    throw new Error('setElementAttributes function has no required argument value');
  }

  element.textContent = text;
  element.draggable = isDraggable;
  element.setAttribute('data-in-list', num);
}

function changeIconOnBreak(data, icon) {
  if (!data || !icon) {
    throw new Error('changeIconOnBreak function has no required argument value');
  }

  if (data.break === true) {
    changeIcon(icon, 'fa-regular', 'fa-circle-play', 'fa-solid', 'fa-mug-hot');
  }

  if (data.break === false && icon.pomodoro.classList.contains('fa-mug-hot')) {
    changeIcon(icon, 'fa-solid', 'fa-mug-hot', 'fa-regular', 'fa-circle-play');
  }

  function changeIcon(icon, rem1, rem2, add1, add2) {
    if (!icon || !rem1 || !rem2 || !add1 || !add2) {
      throw new Error('changeIcon function has no required argument value');
    }

    icon.pomodoro.classList.remove(rem1, rem2);
    icon.pomodoro.classList.add(add1, add2);
  }
}

function showIcon(e) {
  setProperties(e.currentTarget, { '--opacity': '1', '--pointer-events': 'auto' });
}
function hideIcon(e) {
  setProperties(e.currentTarget, { '--opacity': '0', '--pointer-events': 'none' });
}

function hoverAppearIcon(currentElement) {
  if (!currentElement) {
    throw new Error('hoverAppearIcon function has no required argument value');
  }
  currentElement.addEventListener('mouseover', showIcon);
  currentElement.addEventListener('mouseout', hideIcon);
}

export { createItem, isTouchDevice, pomodoroIcon };
