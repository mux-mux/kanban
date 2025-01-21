import checkFunctionParameters from '../errors/checkFunctionParameters';
import {
  setProperties,
  createElementWithClass,
  isTouchDevice,
  restoreFocus,
  getFocusedElement,
} from '../helpers/helpers';
import { editItemText, createEditIcon } from '../modify/editItem';
import { createDeleteIcon, deleteItem } from '../modify/deleteItem';
import { setDeadline } from './deadline';
import { dragItem } from '../modify/dragDropItem';
import { createPomodoroStartIcon, pomodoroInit } from './pomodoro';

import { relocateItem } from '../modify/relocateItem';
import { renderCategoriesSelector } from '../modify/addCategories';
import { getLocalItems, getLocalData } from '../update/localStorage';

let pomodoroIcon = null;
let moveData = {};

function createItem(columnElement, columnNum, item, itemNum) {
  checkFunctionParameters(columnElement, columnNum, item, itemNum);

  const taskLists = document.querySelectorAll('.task__list');
  const taskContainer = createElementWithClass('li', 'task__list-item');
  const taskManagment = createElementWithClass('div', 'task__set');
  const taskProgressBar = createElementWithClass('div', 'task__progressbar');
  const taskData = createElementWithClass('div', 'task__data');
  const taskText = createElementWithClass('div', 'task__text');
  const taskIcons = createElementWithClass('div', 'task__icons');
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

  changeIconOnBreak(itemData, pomodoroIcon.pomodoro.querySelector('i[class^="fa"]'));

  const categoriesSelector = renderCategoriesSelector(columnNum, itemNum);

  taskContainer.addEventListener('click', (e) => editItemText(e, 'task', columnNum, itemNum));

  function moveTaskToANewPosition(e) {
    const [lastFocusedParentId, lastFocusedClass] = getFocusedElement(e);
    const itemsLoaded = getLocalItems();
    const colLength = getLocalData('columnNames').length - 1;
    const keyCombo = e.ctrlKey && e.shiftKey;
    const itemsInCol = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items.length - 1;

    if (keyCombo && e.key === 'ArrowRight') {
      e.preventDefault();
      relocateItem(columnNum, itemNum, columnNum === colLength ? 0 : columnNum + 1, 0);
      restoreFocus(lastFocusedParentId, lastFocusedClass);
    } else if (keyCombo && e.key === 'ArrowLeft') {
      e.preventDefault();
      relocateItem(columnNum, itemNum, columnNum === 0 ? colLength : columnNum - 1, 0);
      restoreFocus(lastFocusedParentId, lastFocusedClass);
    } else if (keyCombo && e.key === 'ArrowUp') {
      e.preventDefault();
      relocateItem(columnNum, itemNum, columnNum, itemNum === 0 ? itemsInCol : itemNum - 1);
      restoreFocus(lastFocusedParentId, lastFocusedClass);
    } else if (keyCombo && e.key === 'ArrowDown') {
      e.preventDefault();
      relocateItem(columnNum, itemNum, columnNum, itemNum === itemsInCol ? 0 : itemNum + 1);
      restoreFocus(lastFocusedParentId, lastFocusedClass);
    }
  }

  taskContainer.addEventListener('focusin', (e) => {
    e.target.addEventListener('keydown', moveTaskToANewPosition);
  });

  taskContainer.addEventListener('focusout', (e) => {
    e.target.removeEventListener('keydown', moveTaskToANewPosition);
  });

  if (columnNum !== 2) {
    taskIcons.appendChild(pomodoroIcon.pomodoro);
    taskIcons.appendChild(taskEditIcon);
  }
  taskIcons.appendChild(taskDeleteIcon);
  taskManagment.appendChild(categoriesSelector);
  taskManagment.appendChild(deadlinePick);
  taskManagment.appendChild(taskSessions);
  taskData.appendChild(taskText);
  taskData.appendChild(taskManagment);
  taskContainer.appendChild(taskData);
  taskContainer.appendChild(taskIcons);
  taskContainer.appendChild(taskProgressBar);
  columnElement.appendChild(taskContainer);

  setElementAttributes(taskContainer, item.id, item.name, true, itemNum, columnNum);
  setProperties(taskContainer, { height: taskContainer.clientHeight + 'px' });

  if (itemData.pomodoro === true) {
    pomodoroInit(pomodoroIcon, itemData, 'init', columnNum, itemNum);
  }

  if (!isTouchDevice()) {
    taskContainer.addEventListener('dragstart', (e) => dragItem(e, columnNum));
    hoverAppearIcon(taskContainer);
  } else {
    taskLists.forEach((item) => {
      setProperties(item, {
        '--opacity': '1',
        '--pointer-events': 'auto',
      });
    });

    taskContainer.addEventListener(
      'touchstart',
      (e) => {
        document
          .querySelectorAll('.task__list-item')
          .forEach((item) => item.classList.remove('touch__selected'));
        if (e.target.classList.contains('task__text')) {
          e.target.closest('.task__list-item').classList.add('touch__selected');
        }
        moveData.columnNum = columnNum;
        moveData.itemNum = +e.currentTarget.attributes['data-in-row'].value;
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

function showMoveButton() {
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
}

function appendSessionIcon(container, num) {
  checkFunctionParameters(container, num);

  const sessionElement = createElementWithClass('li', 'pomodoro__session');
  sessionElement.style.left = 12 * num + 'px';
  container.appendChild(sessionElement);
}

function setElementAttributes(element, id, text, isDraggable, taskNum, colNum) {
  checkFunctionParameters(element, text, isDraggable, taskNum);

  element.querySelector('.task__text').innerText = text;
  element.draggable = isDraggable;
  element.setAttribute('data-id', id);
  element.setAttribute('data-in-row', taskNum);
  element.setAttribute('data-in-col', colNum);
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
  setProperties(e.currentTarget, {
    '--opacity': '1',
    '--pointer-events': 'auto',
  });
}
function hideIcon(e) {
  setProperties(e.currentTarget, { '--opacity': '0', '--pointer-events': 'none' });
}

function hoverAppearIcon(currentElement) {
  checkFunctionParameters(currentElement);

  currentElement.addEventListener('mouseover', showIcon);
  currentElement.addEventListener('mouseout', hideIcon);
}

export {
  createItem,
  isTouchDevice,
  hoverAppearIcon,
  renderItems,
  changeIconOnBreak,
  showMoveButton,
  pomodoroIcon,
};
