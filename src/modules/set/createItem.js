import checkFunctionParameters from '../errors/checkFunctionParameters';
import { setProperties, createElementWithClass, isTouchDevice } from '../helpers/helpers';
import { editItemText, createEditIcon } from '../modify/editItem';
import { createDeleteIcon, deleteItem } from '../modify/deleteItem';
import { setDeadline } from './deadline';
import { dragItem } from '../modify/dragDropItem';
import { createPomodoroStartIcon, pomodoroInit } from './pomodoro';

import { relocateItem } from '../modify/relocateItem';
import { renderCategoriesSelector } from '../modify/addCategories';
import { getLocalItems } from '../update/localStorage';

let pomodoroIcon = null;
let moveData = {};

function createItem(columnElement, columnNum, item, itemNum) {
  checkFunctionParameters(columnElement, columnNum, item, itemNum);

  const taskLists = document.querySelectorAll('.task__list');
  const taskContainer = createElementWithClass('li', 'task__list-item');
  const taskManagment = createElementWithClass('div', 'task__set-container');
  const taskSessions = createElementWithClass('ul', 'pomodoro__sessions');
  const itemsLoaded = getLocalItems();

  const itemData = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum];
  pomodoroIcon = createPomodoroStartIcon(columnNum, itemNum);
  const taskEditIcon = createEditIcon('task', columnNum, itemNum);
  const taskDeleteIcon = createDeleteIcon('task', columnNum, itemNum);

  taskDeleteIcon.addEventListener('click', () => {
    pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
    deleteItem('task', columnNum, itemNum);
    moveData = {};
  });

  const deadlinePick = setDeadline(columnNum, item, itemNum);

  for (let i = 0; i < itemData.sessions; i++) {
    appendSessionIcon(taskSessions, i);
  }

  if (itemData.pomodoro === true) {
    pomodoroInit(pomodoroIcon, itemData, 'init', columnNum, itemNum);
  }

  changeIconOnBreak(itemData, pomodoroIcon.pomodoro.querySelector('i[class^="fa"]'));

  setElementAttributes(taskContainer, item.name, true, itemNum);
  const categoriesSelector = renderCategoriesSelector(columnNum, itemNum);

  taskContainer.addEventListener('click', (e) => editItemText(e, 'task', columnNum, itemNum));

  if (columnNum !== 2) {
    taskManagment.appendChild(pomodoroIcon.pomodoro);
    taskManagment.appendChild(taskEditIcon);
  }
  taskManagment.appendChild(categoriesSelector);
  taskManagment.appendChild(deadlinePick);
  taskManagment.appendChild(taskDeleteIcon);
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

function renderItems(itemsLoaded) {
  const todoElement = document.getElementById('todo-list'),
    inprogressElement = document.getElementById('inprogress-list'),
    doneElement = document.getElementById('done-list'),
    elementsList = [todoElement, inprogressElement, doneElement];

  elementsList.forEach((element) => (element.textContent = ''));

  Object.keys(itemsLoaded).forEach((column, columnNum) => {
    itemsLoaded[column].items.forEach((item, itemNum) => {
      createItem(elementsList[columnNum], columnNum, item, itemNum);
    });
  });
}

document.querySelectorAll('.btn-move').forEach((taskMoveButton, index) => {
  if (isTouchDevice()) {
    taskMoveButton.style.display = 'block';
  }
  taskMoveButton.addEventListener(
    'touchstart',
    () => {
      const newColumnNum = moveData.columnNum != index ? index : index + 1;
      const itemsLoaded = getLocalItems();
      moveData.newColumnNum = newColumnNum;
      moveData.newItemnNum = itemsLoaded[Object.keys(itemsLoaded)[newColumnNum]].items.length;
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
  checkFunctionParameters(container, num);

  const sessionElement = createElementWithClass('li', 'pomodoro__session');
  sessionElement.style.left = 12 * num + 'px';
  container.appendChild(sessionElement);
}

function setElementAttributes(element, text, isDraggable, num) {
  checkFunctionParameters(element, text, isDraggable, num);

  element.textContent = text;
  element.draggable = isDraggable;
  element.setAttribute('data-in-list', num);
}

function changeIconOnBreak(data, icon) {
  checkFunctionParameters(data, icon);

  if (data.break === true) {
    changeIcon(icon, 'fa-regular', 'fa-circle-play', 'fa-solid', 'fa-mug-hot');
  }

  if (data.break === false && icon.classList.contains('fa-mug-hot')) {
    changeIcon(icon, 'fa-solid', 'fa-mug-hot', 'fa-regular', 'fa-circle-play');
  }

  function changeIcon(icon, rem1, rem2, add1, add2) {
    checkFunctionParameters(icon, rem1, rem2, add1, add2);

    icon.classList.remove(rem1, rem2);
    icon.classList.add(add1, add2);
  }
}

function showIcon(e) {
  setProperties(e.currentTarget, { '--opacity': '1', '--pointer-events': 'auto' });
}
function hideIcon(e) {
  setProperties(e.currentTarget, { '--opacity': '0', '--pointer-events': 'none' });
}

function hoverAppearIcon(currentElement) {
  checkFunctionParameters(currentElement);

  currentElement.addEventListener('mouseover', showIcon);
  currentElement.addEventListener('mouseout', hideIcon);
}

export { createItem, isTouchDevice, hoverAppearIcon, renderItems, changeIconOnBreak, pomodoroIcon };
