import { editItem } from '../modify/editItem';
import { deleteItem } from '../modify/deleteItem';
import { setDeadline } from './deadline';
import { drag } from '../modify/dragDropItem';
import { setPomodoro } from './pomodoro';
import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { relocateItem } from '../modify/relocateItem';
import { dragList } from '../modify/addItem';
import { pomodoroInit, removeControlListiners } from '../set/pomodoro';

let pomodoroIcon = null;
let moveData = {};
const isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

function createItem(columnElement, columnNum, item, itemNum) {
  const listElement = createElementWithClass('li', 'drag__list-item');
  const listSetContainer = createElementWithClass('div', 'drag__set-container');
  const removeIcon = createElementWithClass('img', 'drag__list-item-remove-img');
  const removeContainer = createElementWithClass('div', 'drag__list-item-remove');
  const sessionsContainer = createElementWithClass('ul', 'pomodoro__sessions');

  pomodoroIcon = setPomodoro(columnNum, itemNum);
  const deadlinePick = setDeadline(columnNum, item, itemNum);

  const itemData = localLoaded[columnNames[columnNum]].items[itemNum];

  for (let i = 0; i < itemData.sessions; i++) {
    appendSessionIcon(sessionsContainer, i);
  }

  if (itemData.pomodoro === true) {
    pomodoroInit(pomodoroIcon, itemData, 'init', columnNum, itemNum);
  }

  changeIconOnBreak(itemData, pomodoroIcon);

  removeIcon.src = './assets/remove.png';
  removeIcon.alt = 'remove element icon';
  removeContainer.addEventListener('click', () => {
    pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
    deleteItem(columnNum, itemNum);
    moveData = {};
  });

  setElementAttributes(listElement, item.name, true, itemNum);

  dblClickEdit(listElement, columnNum, itemNum);

  if (columnNum !== 2) {
    listSetContainer.appendChild(pomodoroIcon.pomodoro);
  }

  removeContainer.appendChild(removeIcon);
  listSetContainer.appendChild(deadlinePick);
  listSetContainer.appendChild(removeContainer);
  listElement.appendChild(sessionsContainer);
  listElement.appendChild(listSetContainer);
  columnElement.appendChild(listElement);

  if (!isTouch) {
    listElement.addEventListener('dragstart', (e) => drag(e, columnNum));
    hoverAppearIcon(listElement);
  } else {
    dragList.forEach((item) => item.style.setProperty('--visibility', 'visible'));

    listElement.addEventListener(
      'touchstart',
      (e) => {
        document
          .querySelectorAll('.drag__list-item')
          .forEach((item) => item.classList.remove('touch__selected'));
        if (e.target.classList.contains('drag__list-item')) {
          e.target.classList.add('touch__selected');
        }
        moveData.columnNum = columnNum;
        moveData.itemNum = +e.currentTarget.attributes['data-in-list'].value;
      },
      { passive: true }
    );
  }
}

const addMoveBtns = document.querySelectorAll('.add__move');
addMoveBtns.forEach((moveBtn, index) => {
  if (isTouch) {
    moveBtn.style.display = 'block';
  }
  moveBtn.addEventListener(
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
  e.currentTarget.style.setProperty('--visibility', 'visible');
}
function hideIcon(e) {
  e.currentTarget.style.setProperty('--visibility', 'hidden');
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

function dblClickEdit(currentelement, columnNum, itemNum) {
  currentelement.addEventListener('dblclick', (e) => {
    removeControlListiners();
    e.currentTarget.textContent = e.currentTarget.innerText;
    e.currentTarget.setAttribute('contentEditable', true);
    e.currentTarget.setAttribute('draggable', false);
    e.currentTarget.focus();

    focusCarretEnd(e);
  });
  currentelement.addEventListener('blur', (e) => {
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

export { createItem, createElementWithClass, pomodoroIcon };
