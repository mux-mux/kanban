import checkFunctionParameters from '../errors/checkFunctionParameters';
import {
  setProperties,
  createElementWithClass,
  isTouchDevice,
  restoreFocus,
  getFocusedElement,
  removeClassFromElements,
} from '../helpers/helpers';
import { editItemText, createEditIcon } from '../modify/editItem';
import { createDeleteIcon, deleteItem } from '../modify/deleteItem';
import { setDeadline } from './deadline';
import { dragItem } from '../modify/dragDropItem';
import { createPomodoroStartIcon, pomodoroInit } from './pomodoro';

import { relocateItem } from '../modify/relocateItem';
import { renderCategoriesSelector } from '../modify/addCategories';
import { getLocalItems, getLocalData, setLocalData } from '../update/localStorage';

let pomodoroIcon = null;

function createItem(columnElement, columnNum, item, itemNum) {
  checkFunctionParameters(columnElement, columnNum, item, itemNum);

  const taskContainer = setupTaskContainer(columnNum, item, itemNum);
  const itemData = getItemData(columnNum, itemNum);

  setupTaskIcons(taskContainer, columnNum, itemNum, itemData);

  changeIconOnBreak(itemData, pomodoroIcon.pomodoro.querySelector('i[class^="fa"]'));

  columnElement.appendChild(taskContainer);
  initializeTaskAttributes(taskContainer, item, itemNum, columnNum, itemData);
}

function setupTaskContainer(columnNum, item, itemNum) {
  const taskContainer = createElementWithClass('li', 'task__list-item');
  const taskData = createElementWithClass('div', 'task__data');
  const taskText = createElementWithClass('div', 'task__text');
  const taskManagment = createElementWithClass('div', 'task__set');
  const taskIcons = createElementWithClass('div', 'task__icons');
  const taskProgressBar = createElementWithClass('div', 'task__progressbar');

  const deadlinePicker = setDeadline(columnNum, item, itemNum);
  const categoriesSelector = renderCategoriesSelector(columnNum, itemNum);
  const taskSessions = createPomodoroSessions(columnNum, itemNum);

  taskManagment.append(categoriesSelector, deadlinePicker, taskSessions);
  taskData.append(taskText, taskManagment);
  taskContainer.append(taskData, taskIcons, taskProgressBar);

  setupKeyboardNavigation(taskContainer, columnNum, itemNum);

  return taskContainer;
}

function getItemData(columnNum, itemNum) {
  const itemsLoaded = getLocalItems();
  return itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum];
}

function createPomodoroSessions(columnNum, itemNum) {
  const taskSessions = createElementWithClass('ul', 'pomodoro__sessions');
  const itemData = getItemData(columnNum, itemNum);

  for (let i = 0; i < itemData.sessions; i++) {
    const sessionElement = createElementWithClass('li', 'pomodoro__session');
    sessionElement.style.left = `${12 * i}px`;
    taskSessions.appendChild(sessionElement);
  }

  return taskSessions;
}

function setupTaskIcons(taskContainer, columnNum, itemNum, itemData) {
  const taskIcons = taskContainer.querySelector('.task__icons');
  const taskDeleteIcon = createDeleteIcon('task', columnNum, itemNum);
  const taskEditIcon = createEditIcon('task', columnNum, itemNum);
  pomodoroIcon = createPomodoroStartIcon(columnNum, itemNum);

  taskDeleteIcon.addEventListener('click', () => handleDeleteTask(columnNum, itemNum, itemData));
  taskContainer.addEventListener('click', (e) => editItemText(e, 'task', columnNum, itemNum));

  if (columnNum !== 2) {
    taskIcons.append(pomodoroIcon.pomodoro, taskEditIcon);
  }
  taskIcons.appendChild(taskDeleteIcon);
}

function handleDeleteTask(columnNum, itemNum, itemData) {
  pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
  deleteItem('task', columnNum, itemNum);
  setLocalData('moveData', {});
}

function initializeTaskAttributes(taskContainer, item, itemNum, columnNum, itemData) {
  setElementAttributes(taskContainer, item.id, item.name, true, itemNum, columnNum);
  setProperties(taskContainer, { height: taskContainer.clientHeight + 'px' });

  itemData.pomodoro && pomodoroInit(pomodoroIcon, itemData, 'init', columnNum, itemNum);

  if (!isTouchDevice()) {
    taskContainer.addEventListener('dragstart', (e) => dragItem(e, columnNum));
    hoverAppearIcon(taskContainer);
  } else {
    const taskLists = document.querySelectorAll('.task__list');
    taskLists.forEach((item) => {
      setProperties(item, {
        '--opacity': '1',
        '--pointer-events': 'auto',
      });
    });
  }
}

function setupKeyboardNavigation(taskContainer, columnNum, itemNum) {
  const moveTaskHandler = (e) => moveTask(e, columnNum, itemNum);

  taskContainer.addEventListener('focusin', (e) => {
    e.target.addEventListener('keydown', moveTaskHandler);
  });

  taskContainer.addEventListener('focusout', (e) => {
    e.target.removeEventListener('keydown', moveTaskHandler);
  });
}

function moveTask(e, columnNum, itemNum) {
  const [lastFocusedParentId, lastFocusedClass] = getFocusedElement(e);
  const itemsLoaded = getLocalItems();
  const colLength = getLocalData('columnNames').length - 1;
  const itemsInCol = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items.length - 1;

  const keyCombo = e.ctrlKey && e.shiftKey;
  if (!keyCombo) return;

  e.preventDefault();
  if (keyCombo && e.key === 'ArrowRight') {
    relocateItem(columnNum, itemNum, columnNum === colLength ? 0 : columnNum + 1, 0);
  } else if (keyCombo && e.key === 'ArrowLeft') {
    relocateItem(columnNum, itemNum, columnNum === 0 ? colLength : columnNum - 1, 0);
  } else if (keyCombo && e.key === 'ArrowUp') {
    relocateItem(columnNum, itemNum, columnNum, itemNum === 0 ? itemsInCol : itemNum - 1);
  } else if (keyCombo && e.key === 'ArrowDown') {
    relocateItem(columnNum, itemNum, columnNum, itemNum === itemsInCol ? 0 : itemNum + 1);
  }
  restoreFocus(lastFocusedParentId, lastFocusedClass);
}

function setElementAttributes(element, id, text, isDraggable, taskNum, colNum) {
  checkFunctionParameters(element, text, isDraggable, taskNum);

  element.querySelector('.task__text').innerText = text;
  element.draggable = isDraggable;
  element.setAttribute('data-id', id);
  element.setAttribute('data-in-row', taskNum);
  element.setAttribute('data-in-col', colNum);
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

function setSelectOnTouchListener() {
  document.addEventListener(
    'touchstart',
    (e) => {
      e.stopPropagation();

      const moveData = getLocalData('moveData');
      const taskItem = e.target.closest('.task__list-item');
      const classes = e.target.classList;

      removeClassFromElements('task__list-item', 'touch__selected');

      if (
        classes.contains('task__text') ||
        classes.contains('task__list-item') ||
        classes.contains('task__data')
      ) {
        taskItem.classList.add('touch__selected');
        moveData.columnNum = taskItem.attributes['data-in-col'].value;
        moveData.itemNum = taskItem.attributes['data-in-row'].value;
        setLocalData('moveData', moveData);
      } else {
        setLocalData('moveData', {});
      }
    },
    { passive: true }
  );
}

function renderItems(itemsLoaded) {
  const columnElements = [
    document.getElementById('todo-list'),
    document.getElementById('inprogress-list'),
    document.getElementById('done-list'),
  ];

  columnElements.forEach((element) => (element.textContent = ''));

  Object.keys(itemsLoaded).forEach((column, columnNum) => {
    itemsLoaded[column].items.forEach((item, itemNum) => {
      createItem(columnElements[columnNum], columnNum, item, itemNum);
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
        const moveData = getLocalData('moveData');
        const itemsLoaded = getLocalItems();

        const newColumnNum = moveData.columnNum != index ? index : index + 1;
        moveData.newColumnNum = newColumnNum;
        moveData.newItemnNum = itemsLoaded[Object.keys(itemsLoaded)[newColumnNum]].items.length;

        if (moveData.columnNum !== undefined) {
          relocateItem(
            moveData.columnNum,
            moveData.itemNum,
            moveData.newColumnNum,
            moveData.newItemnNum
          );
          setLocalData('moveData', {});
        }
      },
      { passive: true }
    );
  });
}

function changeIconOnBreak(data, icon) {
  checkFunctionParameters(data, icon);

  if (data.break) {
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

export {
  createItem,
  isTouchDevice,
  hoverAppearIcon,
  renderItems,
  changeIconOnBreak,
  showMoveButton,
  setSelectOnTouchListener,
  pomodoroIcon,
};
