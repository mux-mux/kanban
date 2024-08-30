import { editItem } from '../modify/editItem';
import { deleteItem } from '../modify/deleteItem';
import { setDeadline } from './deadline';
import { drag } from '../modify/dragDropItem';
import { setPomodoro, toggleIconOpacity } from './pomodoro';
import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { relocateItem } from '../modify/relocateItem';
import { taskLists } from '../modify/addItem';
import { pomodoroInit, removeControlListiners } from '../set/pomodoro';

let pomodoroIcon = null;
let moveData = {};
const isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

function createItem(columnElement, columnNum, item, itemNum) {
  if (!columnElement || columnNum === undefined || !item || itemNum === undefined) {
    throw new Error('startPomodoro function has no required parameter');
  }

  const taskContainer = createElementWithClass('li', 'tasks__list-item');
  const taskManagment = createElementWithClass('div', 'tasks__set-container');
  const taskRemoveIcon = createElementWithClass('img', 'tasks__list-item-remove-img');
  const taskRemoveArea = createElementWithClass('button', 'tasks__list-item-remove');
  const taskSessions = createElementWithClass('ul', 'pomodoro__sessions');

  pomodoroIcon = setPomodoro(columnNum, itemNum);
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
  taskRemoveArea.addEventListener('focus', (e) => toggleIconOpacity(e, 1));
  taskRemoveArea.addEventListener('blur', (e) => toggleIconOpacity(e, 0));

  setElementAttributes(taskContainer, item.name, true, itemNum);

  editItemText(taskContainer, columnNum, itemNum);

  if (columnNum !== 2) {
    taskManagment.appendChild(pomodoroIcon.pomodoro);
  }

  taskRemoveArea.appendChild(taskRemoveIcon);
  taskManagment.appendChild(deadlinePick);
  taskManagment.appendChild(taskRemoveArea);
  taskContainer.appendChild(taskSessions);
  taskContainer.appendChild(taskManagment);
  columnElement.appendChild(taskContainer);

  if (!isTouch) {
    taskContainer.addEventListener('dragstart', (e) => drag(e, columnNum));
    hoverAppearIcon(taskContainer);
  } else {
    taskLists.forEach((item) => item.style.setProperty('--opacity', '1'));

    taskContainer.addEventListener(
      'touchstart',
      (e) => {
        document
          .querySelectorAll('.tasks__list-item')
          .forEach((item) => item.classList.remove('touch__selected'));
        if (e.target.classList.contains('tasks__list-item')) {
          e.target.classList.add('touch__selected');
        }
        moveData.columnNum = columnNum;
        moveData.itemNum = +e.currentTarget.attributes['data-in-list'].value;
      },
      { passive: true }
    );
  }
}

document.querySelectorAll('.add__move').forEach((taskMoveButton, index) => {
  if (isTouch) {
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
  if (!container || num === undefined) {
    throw new Error('appendSessionIcon function has no required parameter');
  }

  const sessionElement = createElementWithClass('li', 'pomodoro__session');
  sessionElement.style.left = 12 * num + 'px';
  container.appendChild(sessionElement);
}

function setElementAttributes(element, text, isDraggable, num) {
  if (!element || text === undefined || isDraggable === undefined || num === undefined) {
    throw new Error('setElementAttributes function has no required parameter');
  }

  element.textContent = text;
  element.draggable = isDraggable;
  element.setAttribute('data-in-list', num);
}

function changeIconOnBreak(data, icon) {
  if (!data || !icon) {
    throw new Error('changeIconOnBreak function has no required parameter');
  }

  if (data.break === true) {
    changeIcon(icon, 'fa-regular', 'fa-circle-play', 'fa-solid', 'fa-mug-hot');
  }

  if (data.break === false && icon.pomodoro.classList.contains('fa-mug-hot')) {
    changeIcon(icon, 'fa-solid', 'fa-mug-hot', 'fa-regular', 'fa-circle-play');
  }

  function changeIcon(icon, rem1, rem2, add1, add2) {
    if (!icon || !rem1 || !rem2 || !add1 || !add2) {
      throw new Error('changeIcon function has no required parameter');
    }

    icon.pomodoro.classList.remove(rem1, rem2);
    icon.pomodoro.classList.add(add1, add2);
  }
}

function showIcon(e) {
  e.currentTarget.style.setProperty('--opacity', '1');
}
function hideIcon(e) {
  e.currentTarget.style.setProperty('--opacity', '0');
}

function hoverAppearIcon(currentElement) {
  if (!currentElement) {
    throw new Error('hoverAppearIcon function has no required parameter');
  }
  currentElement.addEventListener('mouseover', showIcon);
  currentElement.addEventListener('mouseout', hideIcon);
}

function createElementWithClass(element, clazz) {
  if (!element || !clazz) {
    throw new Error('createElementWithClass function has no required parameter');
  }

  const newElement = document.createElement(element);
  Array.isArray(clazz) ? newElement.classList.add(...clazz) : newElement.classList.add(clazz);
  return newElement;
}

function editItemText(currentElement, columnNum, itemNum) {
  if (!currentElement || columnNum === undefined || itemNum === undefined) {
    throw new Error('editItemText function has no required parameter');
  }
  if (!isTouch) {
    currentElement.addEventListener('dblclick', editCurrentItem);
  } else {
    currentElement.addEventListener('touchend', detectDoubleTap());
  }

  function editCurrentItem(e) {
    removeControlListiners();
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

export { createItem, createElementWithClass, pomodoroIcon };
