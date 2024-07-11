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
  const sessionElement = createElementWithClass('li', 'pomodoro__session');
  sessionElement.style.left = 12 * num + 'px';
  container.appendChild(sessionElement);
}

function setElementAttributes(element, text, isDraggable, num) {
  element.textContent = text;
  element.draggable = isDraggable;
  element.setAttribute('data-in-list', num);
}

function changeIconOnBreak(data, icon) {
  if (data.break === true) {
    changeIcon(icon, 'fa-regular', 'fa-circle-play', 'fa-solid', 'fa-mug-hot');
  }

  if (data.break === false && icon.pomodoro.classList.contains('fa-mug-hot')) {
    changeIcon(icon, 'fa-solid', 'fa-mug-hot', 'fa-regular', 'fa-circle-play');
  }

  function changeIcon(icon, rem1, rem2, add1, add2) {
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
  currentElement.addEventListener('mouseover', showIcon);
  currentElement.addEventListener('mouseout', hideIcon);
}

function createElementWithClass(element, clazz) {
  const newElement = document.createElement(element);
  newElement.classList.add(clazz);
  return newElement;
}

function editItemText(currentElement, columnNum, itemNum) {
  currentElement.addEventListener('dblclick', (e) => {
    removeControlListiners();
    e.currentTarget.textContent = e.currentTarget.innerText;
    e.currentTarget.setAttribute('contentEditable', true);
    e.currentTarget.setAttribute('draggable', false);
    e.currentTarget.focus();

    focusCarretEnd(e);
  });
  currentElement.addEventListener('blur', (e) => {
    e.currentTarget.setAttribute('contentEditable', false);
    e.currentTarget.setAttribute('draggable', true);
    editItem(columnNum, itemNum);
  });
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

export { createItem, createElementWithClass, pomodoroIcon, showIcon, hideIcon };
