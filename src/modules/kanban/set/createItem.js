import { editItem } from '../modify/editItem';
import { deleteItem } from '../modify/deleteItem';
import { setDeadline } from './deadline';
import { drag } from '../modify/dragDropItem';
import { setPomodoro, startPomodoro } from './pomodoro';
import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';

function createItem(columnElement, columnNum, item, itemNum) {
  const listElement = elementWithClass('li', 'drag__list-item');
  const removeIcon = elementWithClass('img', 'drag__list-item-remove');
  const pomodoroIcon = setPomodoro(columnNum, itemNum);
  const itemData = localLoaded[columnNames[columnNum]].items[itemNum];

  const deadlinePick = setDeadline(columnNum, item, itemNum);

  if (itemData.pomodoro === true) {
    pomodoroInit(pomodoroIcon, itemData, 'init', columnNum, itemNum);
  }

  removeIcon.src = '../assets/remove.png';
  removeIcon.addEventListener('click', () => {
    pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
    deleteItem(columnNum, itemNum);
  });

  listElement.textContent = item.name;
  listElement.draggable = true;
  listElement.id = itemNum;
  listElement.addEventListener('dragstart', (e) => drag(e));

  hoverAppearIcon(listElement);
  dblClickEdit(listElement, columnNum, itemNum);

  if (columnNum !== 2) {
    listElement.appendChild(pomodoroIcon.pomodoro);
  }

  listElement.appendChild(deadlinePick);
  listElement.appendChild(removeIcon);
  columnElement.appendChild(listElement);
}

function pomodoroInit(timer, itemData, state, columnNum, itemNum) {
  const MM = document.getElementById('minutes');
  const SS = document.getElementById('seconds');

  const pomodoroText = document.querySelector('.pomodoro__text');

  timer.pomodoro.removeEventListener('click', timer.lunchPomodoro);

  let time = itemData.time === '' ? ['25', '00'] : itemData.time.split(':');

  timer.pomodoro.style.cssText =
    state === 'init' ? 'display: block; color: #eccb34' : 'display: none; color: initial';
  state === 'init'
    ? timer.pomodoro.classList.add('fa-fade')
    : timer.pomodoro.classList.remove('fa-fade');
  document.querySelector('.pomodoro__controls').style.display =
    state === 'init' ? 'inline-block' : 'none';
  pomodoroText.textContent = state === 'init' ? itemData.name : '';

  if (state === 'init') {
    startPomodoro(+time[0] + +time[1] / 60, 5, timer.pomodoro, columnNum, itemNum);
  } else {
    itemData.pomodoro = false;
    itemData.time = '';
    time = ['25', '00'];
  }

  MM.textContent = time[0];
  SS.textContent = time[1];
}

function hoverAppearIcon(currentelement) {
  currentelement.addEventListener('mouseover', (e) => {
    e.currentTarget.style.setProperty('--display', 'block');
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

export { createItem, elementWithClass, pomodoroInit };
