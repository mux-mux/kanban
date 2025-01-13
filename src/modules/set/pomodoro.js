import { createFocusTrap } from 'focus-trap';
import checkFunctionParameters from '../errors/checkFunctionParameters';
import { createElementWithClass, isTouchDevice, toggleItemIconOpacity } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import {
  setLocalItems,
  getLocalItems,
  setLocalIsPaused,
  getLocalIsPaused,
} from '../update/localStorage';
import { relocateItem } from '../modify/relocateItem';

let pomodoroIntervalTick = null;
let focusTrap = null;

function startPomodoro(duration, timer, columnNum, itemNum) {
  checkFunctionParameters(duration, timer, columnNum, itemNum);

  const MM = document.getElementById('minutes');
  const SS = document.getElementById('seconds');

  const pomodoroBreak = document.querySelector('.pomodoro__break');
  const itemsLoaded = getLocalItems();
  const itemData = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum];

  let tick = duration * 60;

  if (itemData.break) {
    pomodoroBreak.style.display = 'block';
  }

  function pomodoroLogic() {
    let minutes = Math.floor(tick / 60);
    let seconds = tick % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    if (tick <= 0) {
      clearInterval(pomodoroIntervalTick);
      if (!itemData.break) {
        itemData.sessions++;
      }

      itemData.break = !itemData.break;
      setLocalItems(itemsLoaded);

      if (itemData.break) {
        pomodoroBreak.style.display = 'block';
        startPomodoro(5, timer, columnNum, itemNum);
        updateDOM();
      } else {
        pomodoroBreak.style.display = 'none';
        startPomodoro(25, timer, columnNum, itemNum);
        updateDOM();
      }
    }
    if (getLocalIsPaused() === false) {
      timer.pomodoro.classList.add('fa-fade');
      tick--;
      MM.textContent = minutes;
      SS.textContent = seconds;
    }
    if (itemData.pomodoro === true && getLocalIsPaused() === false) {
      itemData.time = `${minutes}:${seconds}`;
      setLocalItems(itemsLoaded);
    }
  }

  pomodoroLogic();

  if (pomodoroIntervalTick) {
    clearInterval(pomodoroIntervalTick);
    pomodoroIntervalTick = setInterval(pomodoroLogic, 1000);
  } else {
    pomodoroIntervalTick = setInterval(pomodoroLogic, 1000);
  }
}

function createPomodoroStartIcon(columnNum, itemNum) {
  checkFunctionParameters(columnNum, itemNum);

  const pomodoro = createElementWithClass('button', 'pomodoro__icon');
  const startPomodoroIcon = createElementWithClass('i', ['fa-regular', 'fa-circle-play']);
  const itemsLoaded = getLocalItems();

  const taskText = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].name;
  pomodoro.setAttribute('aria-label', `Start pomodoro timer for ${taskText} task`);

  pomodoro.appendChild(startPomodoroIcon);

  pomodoro.addEventListener('click', startPomodoroByIcon);
  !isTouchDevice() && pomodoro.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouchDevice() && pomodoro.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  function startPomodoroByIcon() {
    removePomodoroTimerListiners();
    setLocalIsPaused(false);
    const pomodoroText = document.querySelector('.pomodoro__text');

    document.querySelector('.pomodoro__controls').style.display = 'flex';

    pomodoroText.textContent = pomodoro.parentElement.innerText;

    for (const columnKey in itemsLoaded) {
      const column = itemsLoaded[columnKey];

      for (const item of column.items) {
        item.pomodoro = false;
        item.time = '';
      }
    }

    itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].pomodoro = true;
    playSound('play.ogg');

    setLocalItems(itemsLoaded);
    updateDOM();
  }

  return { pomodoro, startPomodoroByIcon };
}

function pomodoroInit(timer, itemData, state, columnNum, itemNum) {
  checkFunctionParameters(timer, itemData, state, columnNum, itemNum);

  focusTrap && focusTrap.deactivate();

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
  const pomodoroControls = document.querySelector('.pomodoro__controls');
  const itemsLoaded = getLocalItems();

  focusTrap = createFocusTrap(pomodoroControls, {
    onActivate: () => pause.focus(),
    onDeactivate: () => pause.blur(),
    allowOutsideClick: () => true,
  });

  icon.removeEventListener('click', timer.startPomodoroByIcon);

  let time = itemData.time === '' ? ['25', '00'] : itemData.time.split(':');

  if (state === 'init') {
    getLocalIsPaused() ? pausePomodoro() : playPomodoro();

    showHidePomodoro(kanbanHeading, pomodoroContainer);
    startPomodoro(+time[0] + +time[1] / 60, timer, columnNum, itemNum);

    itemData.break === false && addPomodoroTimerListiners();

    icon.style.cssText = 'opacity: 1; color: #eccb34';
    pomodoroControls.style.display = 'flex';
    text.textContent = itemData.name;
    focusTrap.activate();
  } else {
    showHidePomodoro(pomodoroContainer, kanbanHeading);
    clearInterval(pomodoroIntervalTick);
    itemData.pomodoro = false;
    itemData.time = '';
    time = ['25', '00'];

    icon.style.cssText = 'opacity: var(--opacity); pointer-events: var(--pointer-events);';
    icon.classList.remove('fa-fade');
    pomodoroControls.style.display = 'none';
    text.textContent = '';

    focusTrap.deactivate();
    itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum] = itemData;
    setLocalItems(itemsLoaded);
    setLocalIsPaused(false);
    updateDOM();
  }

  function showHidePomodoro(firstItem, secondItem) {
    checkFunctionParameters(firstItem, secondItem);

    firstItem.style.display = 'none';
    secondItem.style.display = 'flex';
  }

  function pausePomodoro(e) {
    pause.style.display = 'none';
    play.style.display = 'inline-block';
    setLocalIsPaused(true);
    icon.classList.remove('fa-fade');
    play.focus();

    e && playSound('pause.ogg');
  }

  function playPomodoro(e) {
    play.style.display = 'none';
    pause.style.display = 'inline-block';
    setLocalIsPaused(false);
    icon.classList.add('fa-fade');
    pause.focus();

    e && playSound('play.ogg');
  }

  function resetPomodoro(e) {
    if (itemData.break === true) {
      itemData.break = false;
      itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum] = itemData;
      coffee.style.display = 'none';
      setLocalItems(itemsLoaded);
    }

    removePomodoroTimerListiners();
    pomodoroInit(timer, itemData, 'remove', columnNum, itemNum);
    focusTrap.deactivate();
    e && playSound('reset.ogg');
  }

  function donePomodoro(e) {
    const itemsLoaded = getLocalItems();
    const columnDoneNum = Object.keys(itemsLoaded).length - 1;

    removePomodoroTimerListiners();
    relocateItem(
      columnNum,
      itemNum,
      2,
      itemsLoaded[Object.keys(itemsLoaded)[columnDoneNum]].items.length
    );

    e && playSound('done.ogg');
  }

  function addPomodoroTimerListiners() {
    done.addEventListener('click', donePomodoro);
    reset.addEventListener('click', resetPomodoro);
    pause.addEventListener('click', pausePomodoro);
    play.addEventListener('click', playPomodoro);
  }

  MM.textContent = time[0];
  SS.textContent = time[1];
}

function playSound(soundSample) {
  checkFunctionParameters(soundSample);

  const audio = new Audio('./assets/sounds/' + soundSample);
  audio.play();
}

function setPomodoroIsPausedOnReload() {
  window.addEventListener('beforeunload', () => setLocalIsPaused(true));
}

function removePomodoroTimerListiners() {
  const pomodoroContainer = document.getElementById('pomodoro');
  const pomodoroContainerClone = pomodoroContainer.cloneNode(true);

  pomodoroContainer.parentNode.replaceChild(pomodoroContainerClone, pomodoroContainer);
}

export {
  createPomodoroStartIcon,
  startPomodoro,
  pomodoroInit,
  removePomodoroTimerListiners,
  toggleItemIconOpacity,
  setPomodoroIsPausedOnReload,
  pomodoroIntervalTick,
};
