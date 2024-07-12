import { createFocusTrap } from 'focus-trap';

import { createElementWithClass } from './createItem';
import { localLoaded, updateDOM, updatedOnLoad } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { setLocalItems } from '../update/localStorage';
import { relocateItem } from '../modify/relocateItem';

let interval = null;
let isPause = false;

function startPomodoro(duration, timer, columnNum, itemNum) {
  const MM = document.getElementById('minutes');
  const SS = document.getElementById('seconds');

  const pomodoroBreak = document.querySelector('.pomodoro__break');
  const itemData = localLoaded[columnNames[columnNum]].items[itemNum];

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
      clearInterval(interval);
      if (!itemData.break) {
        itemData.sessions++;
      }

      itemData.break = !itemData.break;

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
    if (!isPause) {
      timer.pomodoro.classList.add('fa-fade');
      tick--;
      MM.textContent = minutes;
      SS.textContent = seconds;
    }
    if (itemData.pomodoro === true && !isPause) {
      itemData.time = `${minutes}:${seconds}`;
    }
    setLocalItems(columnNames);
  }

  pomodoroLogic();

  if (interval) {
    clearInterval(interval);
    interval = setInterval(pomodoroLogic, 1000);
  } else {
    interval = setInterval(pomodoroLogic, 1000);
  }
}

function toggleIconOpacity(e, state) {
  e.target.offsetParent.style.setProperty('--opacity', state);
}

function setPomodoro(columnNum, itemNum) {
  const pomodoro = createElementWithClass('button', 'fa-regular');
  pomodoro.classList.add('fa-circle-play');
  pomodoro.classList.add('pomodoro__icon');

  pomodoro.addEventListener('click', lunchPomodoro);
  pomodoro.addEventListener('focus', (e) => toggleIconOpacity(e, 1));
  pomodoro.addEventListener('blur', (e) => toggleIconOpacity(e, 0));

  function lunchPomodoro() {
    removeControlListiners();
    isPause = false;
    const pomodoroText = document.querySelector('.pomodoro__text');

    document.querySelector('.pomodoro__controls').style.display = 'flex';

    pomodoroText.textContent = pomodoro.parentElement.innerText;

    for (const columnKey in localLoaded) {
      const column = localLoaded[columnKey];

      for (const item of column.items) {
        item.pomodoro = false;
        item.time = '';
      }
    }

    localLoaded[columnNames[columnNum]].items[itemNum].pomodoro = true;

    updateDOM();
  }

  return { pomodoro, lunchPomodoro };
}

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
  const pomodoroControls = document.querySelector('.pomodoro__controls');

  const focusTrap = createFocusTrap(pomodoroControls, {
    onActivate: () => pause.focus(),
    onDeactivate: () => {
      resetPomodoro();
      pause.blur();
    },
  });

  icon.removeEventListener('click', timer.lunchPomodoro);

  let time = itemData.time === '' ? ['25', '00'] : itemData.time.split(':');

  if (state === 'init') {
    !updatedOnLoad || isPause ? pausePomodoro() : playPomodoro();

    showHidePomodoro(kanbanHeading, pomodoroContainer);
    startPomodoro(+time[0] + +time[1] / 60, timer, columnNum, itemNum);

    addControlListiners();

    icon.style.cssText = 'opacity: 1; color: #eccb34';
    pomodoroControls.style.display = 'flex';
    text.textContent = itemData.name;
    focusTrap.activate();
  } else {
    showHidePomodoro(pomodoroContainer, kanbanHeading);
    clearInterval(interval);
    isPause = false;
    itemData.pomodoro = false;
    itemData.time = '';
    time = ['25', '00'];

    icon.style.cssText = 'opacity: var(--opacity);';
    icon.classList.remove('fa-fade');
    pomodoroControls.style.display = 'none';
    text.textContent = '';

    updateDOM();
  }

  function showHidePomodoro(firstItem, secondItem) {
    firstItem.style.display = 'none';
    secondItem.style.display = 'flex';
  }

  function pausePomodoro() {
    pause.style.display = 'none';
    play.style.display = 'inline-block';
    isPause = true;
    icon.classList.remove('fa-fade');
    play.focus();

    playSound('pause.ogg');
  }

  function playPomodoro() {
    play.style.display = 'none';
    pause.style.display = 'inline-block';
    isPause = false;
    icon.classList.add('fa-fade');
    pause.focus();

    playSound('play.ogg');
  }

  function resetPomodoro() {
    removeControlListiners();
    pomodoroInit(timer, itemData, 'remove', columnNum, itemNum);
    focusTrap.deactivate();

    if (itemData.break === true) {
      itemData.break = false;
      coffee.style.display = 'none';
    }
  }

  function donePomodoro() {
    removeControlListiners();
    relocateItem(columnNum, itemNum, 2, localLoaded[columnNames[2]].items.length);
    focusTrap.deactivate();

    playSound('done.ogg');
  }

  function addControlListiners() {
    done.addEventListener('click', donePomodoro);
    reset.addEventListener('click', resetPomodoro);
    pause.addEventListener('click', pausePomodoro);
    play.addEventListener('click', playPomodoro);
  }

  MM.textContent = time[0];
  SS.textContent = time[1];

  function playSound(soundSample) {
    const audio = new Audio('./assets/sounds/' + soundSample);
    audio.play();
  }
}

function removeControlListiners() {
  const pomodoroContainer = document.getElementById('pomodoro');
  const pomodoroContainerClone = pomodoroContainer.cloneNode(true);

  pomodoroContainer.parentNode.replaceChild(pomodoroContainerClone, pomodoroContainer);
}

export {
  setPomodoro,
  startPomodoro,
  pomodoroInit,
  removeControlListiners,
  toggleIconOpacity,
  interval,
};
