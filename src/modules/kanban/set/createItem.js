import { editItem } from '../modify/editItem';
import { deleteItem } from '../modify/deleteItem';
import { setDeadline } from './deadline';
import { drag } from '../modify/dragDropItem';
import { interval, setPomodoro, startPomodoro } from './pomodoro';
import { localLoaded, updateDOM, updatedOnLoad } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { relocateItem } from '../modify/relocateItem';
import { dragList } from '../modify/addItem';

let pomodoroIcon = null;
let isPause = false;
const moveData = {};
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
  removeContainer.addEventListener('click', () => {
    pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
    deleteItem(columnNum, itemNum);
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
    dragList.forEach((item) => item.style.setProperty('--display', 'inline-block'));

    listElement.addEventListener('touchstart', (e) => {
      document
        .querySelectorAll('.drag__list-item')
        .forEach((item) => item.classList.remove('touch__selected'));
      e.currentTarget.classList.add('touch__selected');
      moveData.columnNum = columnNum;
      moveData.itemNum = +e.currentTarget.id;
    });
  }
}

const addMoveBtns = document.querySelectorAll('.add__move');
addMoveBtns.forEach((moveBtn, index) => {
  if (isTouch) {
    moveBtn.style.display = 'block';
  }
  moveBtn.addEventListener('touchstart', () => {
    const newColumnNum = moveData.columnNum != index ? index : index + 1;
    moveData.newColumnNum = newColumnNum;
    moveData.newItemnNum = localLoaded[columnNames[newColumnNum]].items.length;
    relocateItem(moveData.columnNum, moveData.itemNum, moveData.newColumnNum, moveData.newItemnNum);
  });
});

function pomodoroInit(timer, itemData, state, columnNum, itemNum) {
  const MM = document.getElementById('minutes');
  const SS = document.getElementById('seconds');

  const pause = document.querySelector('.fa-pause');
  const play = document.querySelector('.fa-play');
  const done = document.querySelector('.fa-check');
  const reset = document.querySelector('.fa-backward-step');
  const coffee = document.querySelector('.pomodoro__break');
  const text = document.querySelector('.pomodoro__text');
  const icon = timer.pomodoro;

  const kanbanHeading = document.querySelector('.heading-primary');
  const pomodoroContainer = document.querySelector('.pomodoro');
  const controlsContainer = document.querySelector('.pomodoro__controls');

  icon.removeEventListener('click', timer.lunchPomodoro);

  let time = itemData.time === '' ? ['25', '00'] : itemData.time.split(':');

  if (state === 'init') {
    if (!updatedOnLoad) {
      pausePomodoro();
    }
    showHidePomodoro(kanbanHeading, pomodoroContainer);
    addControlListiners();
    startPomodoro(+time[0] + +time[1] / 60, timer, columnNum, itemNum);

    icon.style.cssText = 'display: block; color: #eccb34';
    controlsContainer.style.display = 'inline-block';
    text.textContent = itemData.name;
  } else {
    showHidePomodoro(pomodoroContainer, kanbanHeading);
    clearInterval(interval);
    isPause = false;
    itemData.pomodoro = false;
    itemData.time = '';
    time = ['25', '00'];

    icon.style.cssText = 'display: var(--display);';
    icon.classList.remove('fa-fade');
    controlsContainer.style.display = 'none';
    text.textContent = '';

    updateDOM();
  }

  function showHidePomodoro(firstItem, secondItem) {
    firstItem.style.display = 'none';
    secondItem.style.display = 'block';
  }

  function pausePomodoro() {
    pause.style.display = 'none';
    play.style.display = 'inline-block';
    isPause = true;
    icon.classList.remove('fa-fade');
  }

  function playPomodoro() {
    play.style.display = 'none';
    pause.style.display = 'inline-block';
    isPause = false;
    icon.classList.add('fa-fade');
  }

  function resetPomodoro() {
    removeControlListiners();
    pomodoroInit(timer, itemData, 'remove', columnNum, itemNum);

    if (itemData.break === true) {
      itemData.break = false;
      coffee.style.display = 'none';
    }
  }

  function donePomodoro() {
    removeControlListiners();
    relocateItem(columnNum, itemNum, 2, localLoaded[columnNames[2]].items.length);
  }

  function addControlListiners() {
    done.addEventListener('click', donePomodoro);
    reset.addEventListener('click', resetPomodoro);
    pause.addEventListener('click', pausePomodoro);
    play.addEventListener('click', playPomodoro);
  }

  function removeControlListiners() {
    done.removeEventListener('click', donePomodoro);
    reset.removeEventListener('click', resetPomodoro);
    pause.removeEventListener('click', pausePomodoro);
    play.removeEventListener('click', playPomodoro);
  }

  MM.textContent = +time[0] < 10 ? `0${time[0]}` : time[0];
  SS.textContent = time[1];
}

function appendSessionIcon(container, num) {
  const sessionElement = createElementWithClass('li', 'pomodoro__session');
  sessionElement.style.left = 12 * num + 'px';
  container.appendChild(sessionElement);
}

function setElementAttributes(element, text, isDraggable, id) {
  element.textContent = text;
  element.draggable = isDraggable;
  element.id = id;
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
  e.currentTarget.style.setProperty('--display', 'inline-block');
}
function hideIcon(e) {
  e.currentTarget.style.setProperty('--display', 'none');
}

function hoverAppearIcon(currentElement) {
  currentElement.addEventListener('mouseover', showIcon);
  currentElement.addEventListener('mouseout', hideIcon);
  currentElement.addEventListener('mousedown', () => {
    document
      .querySelectorAll('.drag__list-item')
      .forEach((item) => item.removeEventListener('mouseover', showIcon));
  });
}

function createElementWithClass(element, clazz) {
  const newElement = document.createElement(element);
  newElement.classList.add(clazz);
  return newElement;
}

function dblClickEdit(currentelement, columnNum, itemNum) {
  currentelement.addEventListener('dblclick', (e) => {
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

export { createItem, createElementWithClass, pomodoroInit, pomodoroIcon, isPause };
