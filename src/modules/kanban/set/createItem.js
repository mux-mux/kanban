import { editItem } from '../modify/editItem';
import { deleteItem } from '../modify/deleteItem';
import { setDeadline } from './deadline';
import { drag } from '../modify/dragDropItem';
import { interval, setPomodoro, startPomodoro } from './pomodoro';
import { localLoaded, updateDOM, updatedOnLoad } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { relocateItem } from '../modify/relocateItem';

let pomodoroIcon = null;
let isPause = false;

function createItem(columnElement, columnNum, item, itemNum) {
  const isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
  const listElement = elementWithClass('li', 'drag__list-item');
  const listSetContainer = elementWithClass('div', 'drag__set-container');
  const removeIcon = elementWithClass('img', 'drag__list-item-remove-img');
  const removeContainer = elementWithClass('div', 'drag__list-item-remove');
  pomodoroIcon = setPomodoro(columnNum, itemNum);
  const itemData = localLoaded[columnNames[columnNum]].items[itemNum];
  const sessionsContainer = elementWithClass('ul', 'pomodoro__sessions');

  const deadlinePick = setDeadline(columnNum, item, itemNum);

  for (let i = 0; i < itemData.sessions; i++) {
    const sessionElement = elementWithClass('li', 'pomodoro__session');
    sessionElement.style.left = 12 * i + 'px';
    sessionsContainer.appendChild(sessionElement);
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

  listElement.textContent = item.name;
  listElement.draggable = true;
  listElement.id = itemNum;

  if (!isTouch) {
    listElement.addEventListener('dragstart', (e) => drag(e, columnNum));
  }

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
    hoverAppearIcon(listElement);
  } else {
    document
      .querySelectorAll('.drag__list-item')
      .forEach((item) => item.style.setProperty('--display', 'inline-block'));
  }
}

function pomodoroInit(timer, itemData, state, columnNum, itemNum) {
  const MM = document.getElementById('minutes');
  const SS = document.getElementById('seconds');

  const pause = document.querySelector('.fa-pause');
  const play = document.querySelector('.fa-play');
  const done = document.querySelector('.fa-check');
  const reset = document.querySelector('.fa-backward-step');
  const pomodoroBreak = document.querySelector('.pomodoro__break');
  const pomodoroText = document.querySelector('.pomodoro__text');

  const kanbanHeading = document.querySelector('.heading-primary');
  const pomodorContainer = document.querySelector('.pomodoro');

  timer.pomodoro.removeEventListener('click', timer.lunchPomodoro);

  let time = itemData.time === '' ? ['25', '00'] : itemData.time.split(':');

  timer.pomodoro.style.cssText =
    state === 'init' ? 'display: block; color: #eccb34' : 'display: var(--display);';
  state === 'init'
    ? timer.pomodoro.classList.add('fa-fade')
    : timer.pomodoro.classList.remove('fa-fade');
  document.querySelector('.pomodoro__controls').style.display =
    state === 'init' ? 'inline-block' : 'none';
  pomodoroText.textContent = state === 'init' ? itemData.name : '';

  if (state === 'init') {
    if (!updatedOnLoad) {
      pausePomodoro();
    }
    showHidePomodoro(kanbanHeading, pomodorContainer);
    addControlListiners();
    startPomodoro(+time[0] + +time[1] / 60, timer, columnNum, itemNum);
  } else {
    showHidePomodoro(pomodorContainer, kanbanHeading);
    clearInterval(interval);
    itemData.pomodoro = false;
    itemData.time = '';
    time = ['25', '00'];

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
    timer.pomodoro.classList.remove('fa-fade');
  }

  function playPomodoro() {
    play.style.display = 'none';
    pause.style.display = 'inline-block';
    isPause = false;
    timer.pomodoro.classList.add('fa-fade');
  }

  function resetPomodoro() {
    removeControlListiners();
    pomodoroInit(timer, itemData, 'remove', columnNum, itemNum);

    if (itemData.break === true) {
      itemData.break = false;
      pomodoroBreak.style.display = 'none';
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
} /*END INIT */

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

function hoverAppearIcon(currentelement) {
  currentelement.addEventListener('mouseenter', showIcon);
  currentelement.addEventListener('mousedown', () => {
    document
      .querySelectorAll('.drag__list-item')
      .forEach((item) => item.removeEventListener('mouseenter', showIcon));
  });
  currentelement.addEventListener('mouseout', (e) =>
    e.currentTarget.style.setProperty('--display', 'none')
  );
}

function elementWithClass(element, clazz) {
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

export { createItem, elementWithClass, pomodoroInit, pomodoroIcon, isPause };
