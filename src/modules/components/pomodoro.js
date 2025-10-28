import { createFocusTrap } from 'focus-trap';
import checkFunctionParameters from '../errors/errors';
import {
  createElementWithClass,
  isTouchDevice,
  toggleItemIconOpacity,
  restoreFocus,
} from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import {
  setLocalItems,
  getLocalItems,
  setLocalData,
  getLocalData,
  removeLocalData,
} from '../update/localStorage';
import { relocateItem } from './task/relocate';

let focusTrap = null;

function startPomodoro(duration, timer, columnNum, itemNum) {
  checkFunctionParameters(duration, timer, columnNum, itemNum);

  const MM = document.getElementById('minutes');
  const SS = document.getElementById('seconds');
  const pomodoroSkipButton = document.querySelector('.pomodoro__skip-break');

  const itemsLoaded = getLocalItems();
  const itemData = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum];
  const itemInCol = document.querySelectorAll(`[data-in-col="${columnNum}"]`)[itemNum];
  const progressBar = itemInCol.querySelector('.task__progressbar');

  let tick = duration * 60;
  let pomodoroIntervalTick = getLocalData('pomodoroInterval');

  updateUI();

  function updateUI() {
    const minutes = String(Math.floor(tick / 60)).padStart(2, '0');
    const seconds = String(tick % 60).padStart(2, '0');
    const staticTime = itemData.break ? 5 : 25;
    MM.textContent = minutes;
    SS.textContent = seconds;

    const progressPercent = Math.min(100 - (tick / (staticTime * 60)) * 100, 100);
    progressBar.style.width = `${progressPercent}%`;
  }

  function toggleBreakUI(isBreak, pomodoroSkipButton) {
    pomodoroSkipButton.addEventListener('click', handleCompletion, { once: true });
    pomodoroSkipButton.style.display = isBreak ? 'block' : 'none';
  }

  function handleCompletion() {
    clearInterval(pomodoroIntervalTick);
    removeLocalData('pomodoroInterval');
    itemData.sessions += itemData.break ? 0 : 1;
    itemData.break = !itemData.break;
    itemData.break ? playSound('session-done.ogg') : playSound('play.ogg');
    toggleBreakUI(itemData.break, pomodoroSkipButton);
    itemData.time = itemData.break ? '05:00' : '25:00';
    setLocalItems(itemsLoaded);
    pomodoroSkipButton.removeEventListener('click', handleCompletion);
    updateDOM();
  }

  function pomodoroLogic() {
    const isPaused = getLocalData('isPaused');

    if (!isPaused) {
      timer.pomodoro.classList.add('fa-fade');
      tick--;
      updateUI();

      if (itemData.pomodoro === true) {
        const itemsLoaded = getLocalItems();
        const itemData = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum];
        itemData.time = `${MM.textContent}:${SS.textContent}`;
        setLocalItems(itemsLoaded);
      }
      if (tick <= 0) {
        handleCompletion();
      }
    }
  }

  if (pomodoroIntervalTick) {
    clearInterval(pomodoroIntervalTick);
    removeLocalData('pomodoroInterval');
  }
  pomodoroIntervalTick = setInterval(pomodoroLogic, 1000);
  setLocalData('pomodoroInterval', pomodoroIntervalTick);

  toggleBreakUI(itemData.break, pomodoroSkipButton);
  updateUI();
}

function createPomodoroStartIcon(columnNum, itemNum) {
  checkFunctionParameters(columnNum, itemNum);

  const itemsLoaded = getLocalItems();
  const taskName = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].name;

  const pomodoro = createPomodoroButton();
  const startPomodoroIcon = createStartIcon();

  pomodoro.appendChild(startPomodoroIcon);
  addPomodoroEventListeners();

  return { pomodoro, startPomodoroByIcon };

  function createPomodoroButton() {
    const button = createElementWithClass('button', ['icon', 'icon-pomodoro']);
    button.ariaLabel = `Start the pomodoro timer for the ${taskName} task`;
    return button;
  }

  function createStartIcon() {
    return createElementWithClass('i', ['fa-regular', 'fa-circle-play']);
  }

  function addPomodoroEventListeners() {
    pomodoro.addEventListener('click', startPomodoroByIcon);
    if (!isTouchDevice()) {
      pomodoro.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
      pomodoro.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));
    }
  }

  function startPomodoroByIcon() {
    resetAllPomodoroStates();
    initializePomodoroTimer();
  }

  function resetAllPomodoroStates() {
    for (const column of Object.values(itemsLoaded)) {
      for (const item of column.items) {
        item.pomodoro = false;
        item.time = '';
      }
    }
    setLocalItems(itemsLoaded);
  }

  function initializePomodoroTimer() {
    const itemsLoaded = getLocalItems();
    removePomodoroTimerListiners();
    setLocalData('isPaused', false);

    document.querySelector('.pomodoro__controls').style.display = 'flex';
    const pomodoroText = document.querySelector('.pomodoro__text');
    pomodoroText.textContent = pomodoro.parentElement.innerText;

    itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].pomodoro = true;
    playSound('play.ogg');

    setLocalItems(itemsLoaded);
    if (columnNum === 0) {
      relocateItem(
        columnNum,
        itemNum,
        columnNum + 1,
        itemsLoaded[Object.keys(itemsLoaded)[columnNum + 1]].items.length
      );
    } else {
      updateDOM();
    }
  }
}

function pomodoroInit(timer, itemData, state, columnNum, itemNum) {
  checkFunctionParameters(timer, itemData, state, columnNum, itemNum);
  //Firefox focus-trap bug. Select the category jumping shown/hidden when activated
  //On TouchDevices to prevent scrollToTop page on start pomodoro timer
  !isFirefox && !isTouchDevice() && focusTrap?.deactivate();

  const domElements = getDomElements();
  const itemsLoaded = getLocalItems();
  const pomodoroIntervalTick = getLocalData('pomodoroInterval');
  const isPaused = getLocalData('isPaused');
  const isEdit = getLocalData('isEdit');
  const isMoved = getLocalData('isMoved');
  const isAnotherDeleted = getLocalData('isAnotherDeleted');
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

  focusTrap = createFocusTrap(domElements.pomodoroControls, {
    onActivate: () => domElements.pause.focus(),
    onDeactivate: () => domElements.pause.blur(),
    allowOutsideClick: () => true,
  });

  const time = parseTime(itemData.time);
  domElements.icon.removeEventListener('click', timer.startPomodoroByIcon);

  if (state === 'init') {
    handleInitState();
  } else {
    handleRemoveState();
  }

  function getDomElements() {
    return {
      MM: document.getElementById('minutes'),
      SS: document.getElementById('seconds'),
      pause: document.querySelector('.fa-pause'),
      play: document.querySelector('.fa-play'),
      done: document.querySelector('.fa-check'),
      reset: document.querySelector('.fa-backward-step'),
      skip: document.querySelector('.pomodoro__skip-break'),
      text: document.querySelector('.pomodoro__text'),
      icon: timer.pomodoro,
      kanbanHeading: document.querySelector('.heading-primary'),
      pomodoroContainer: document.querySelector('.pomodoro'),
      pomodoroControls: document.querySelector('.pomodoro__controls'),
    };
  }

  function parseTime(timeString) {
    return timeString === '' ? ['25', '00'] : timeString.split(':');
  }

  function calculateMinutes([minutes, seconds]) {
    return +minutes + +seconds / 60;
  }

  function handleInitState() {
    isPaused ? pausePomodoro() : playPomodoro();

    togglePomodoroDisplay(domElements.kanbanHeading, domElements.pomodoroContainer);
    startPomodoro(calculateMinutes(time), timer, columnNum, itemNum);

    if (itemData.time === '' || isPaused || isEdit || isMoved || isAnotherDeleted) {
      addPomodoroTimerListeners();
    }

    updateIconStyles(true);
    domElements.pomodoroControls.style.display = 'flex';
    domElements.text.textContent = itemData.name;
    !isFirefox && !isTouchDevice() && focusTrap.activate();
    removeLocalData('isEdit');
    removeLocalData('isMoved');
    removeLocalData('isAnotherDeleted');
  }

  function handleRemoveState() {
    togglePomodoroDisplay(domElements.pomodoroContainer, domElements.kanbanHeading);
    clearInterval(pomodoroIntervalTick);
    removeLocalData('pomodoroInterval');
    resetItemState();

    updateIconStyles(false);
    domElements.pomodoroControls.style.display = 'none';
    domElements.text.textContent = '';

    !isFirefox && !isTouchDevice() && focusTrap.deactivate();
    itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum] = itemData;
    setLocalItems(itemsLoaded);
    updateDOM();
  }

  function updateIconStyles(isActive) {
    domElements.icon.style.cssText = isActive
      ? 'opacity: 1; color: #eccb34;'
      : 'opacity: var(--opacity); pointer-events: var(--pointer-events);';
    isActive
      ? domElements.icon.setAttribute('data-pomodoro', true)
      : domElements.icon.classList.remove('fa-fade');
  }

  function resetItemState() {
    itemData.pomodoro = false;
    itemData.time = '';
  }

  function togglePomodoroDisplay(hiddenElement, visibleElement) {
    hiddenElement.style.display = 'none';
    visibleElement.style.display = 'flex';
  }

  function togglePlayPauseVisibility(isPaused) {
    domElements.pause.style.display = isPaused ? 'none' : 'inline-block';
    domElements.play.style.display = isPaused ? 'inline-block' : 'none';
  }

  function pausePomodoro(e) {
    togglePlayPauseVisibility(true);
    setLocalData('isPaused', true);
    domElements.icon.classList.remove('fa-fade');
    !isTouchDevice() && domElements.play.focus();

    e && playSound('pause.ogg');
  }

  function playPomodoro(e) {
    togglePlayPauseVisibility(false);
    setLocalData('isPaused', false);
    domElements.icon.classList.add('fa-fade');
    !isTouchDevice() && domElements.pause.focus();

    e && playSound('play.ogg');
  }

  function resetPomodoro(e) {
    const itemsLoaded = getLocalItems();

    // Validate itemNum to prevent prototype pollution
    if (['__proto__', 'constructor', 'prototype'].includes(itemNum)) {
      throw new Error('Invalid itemNum value');
    }

    const itemData = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum];
    const lastFocusedIcon = document.querySelector('[data-pomodoro="true"]');
    const lastFocusedParentId = lastFocusedIcon.closest('.task__list-item').dataset.id;

    if (itemData.break === true) {
      itemData.break = false;
      domElements.skip.style.display = 'none';
      setLocalItems(itemsLoaded);
    }

    removePomodoroTimerListiners();
    pomodoroInit(timer, itemData, 'remove', columnNum, itemNum);
    !isFirefox && !isTouchDevice() && focusTrap.deactivate();
    e && playSound('reset.ogg');

    restoreFocus(lastFocusedParentId, 'icon-pomodoro');
  }

  function donePomodoro(e) {
    const columnDoneNum = Object.keys(itemsLoaded).length - 1;

    removePomodoroTimerListiners();
    relocateItem(
      columnNum,
      itemNum,
      columnDoneNum,
      itemsLoaded[Object.keys(itemsLoaded)[columnDoneNum]].items.length
    );

    e && playSound('done.ogg');
  }

  function addPomodoroTimerListeners() {
    domElements.done.addEventListener('click', donePomodoro);
    domElements.reset.addEventListener('click', resetPomodoro);
    domElements.pause.addEventListener('click', pausePomodoro);
    domElements.play.addEventListener('click', playPomodoro);
  }

  domElements.MM.textContent = time[0];
  domElements.SS.textContent = time[1];
}

function playSound(soundSample) {
  checkFunctionParameters(soundSample);

  const audio = new Audio('./assets/sounds/' + soundSample);
  audio.play();
}

function setPomodoroIsPausedOnReload(data) {
  const pomodoroStates = Object.values(data)
    .flatMap((column) => column.items)
    .map((item) => item.pomodoro);
  pomodoroStates.includes(true) && setLocalData('isPaused', true);
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
};
