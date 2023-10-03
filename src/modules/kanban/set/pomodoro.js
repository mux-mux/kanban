import { elementWithClass } from './createItem';
import { localLoaded, updateDOM } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { setLocalItems } from '../update/localStorage';
import { deleteItem, overallRemoved } from '../modify/deleteItem';
import { pomodoroInit } from './createItem';
import { undoItem } from '../modify/undoItem';

let interval = null;

function startPomodoro(duration, pomodoro, columnNum, itemNum) {
  const MM = document.getElementById('minutes');
  const SS = document.getElementById('seconds');
  const pause = document.querySelector('.fa-pause');
  const play = document.querySelector('.fa-play');
  const done = document.querySelector('.fa-check');
  const pomodoroBreak = document.querySelector('.pomodoro__break');
  const itemData = localLoaded[columnNames[columnNum]].items[itemNum];

  let timer = duration * 60;
  let isPause = false;

  if (itemData.break) {
    pomodoroBreak.style.display = 'block';
  }

  pause.addEventListener('click', () => {
    pause.style.display = 'none';
    play.style.display = 'inline-block';
    isPause = true;
    pomodoro.classList.remove('fa-fade');
  });

  play.addEventListener('click', () => {
    play.style.display = 'none';
    pause.style.display = 'inline-block';
    isPause = false;
    pomodoro.classList.add('fa-fade');
  });

  done.addEventListener('click', () => {
    pomodoroInit(setPomodoro(columnNum, itemNum), itemData, 'remove', columnNum, itemNum);
    deleteItem(columnNum, itemNum);
    undoItem(columnNames, overallRemoved, 'done');
  });

  function pomodoroLogic() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    if (timer <= 0) {
      clearInterval(interval);
      if (!itemData.break) {
        itemData.sessions++;
      }

      itemData.break = !itemData.break;

      if (itemData.break) {
        pomodoroBreak.style.display = 'block';
        startPomodoro(5, pomodoro, columnNum, itemNum);
        updateDOM();
      } else {
        pomodoroBreak.style.display = 'none';
        startPomodoro(25, pomodoro, columnNum, itemNum);
        updateDOM();
      }
    }
    if (!isPause) {
      timer--;
      MM.textContent = minutes < 10 ? `0${minutes}` : minutes;
      SS.textContent = seconds.toString().padStart(2, '0');
    }
    if (itemData.pomodoro === true) {
      itemData.time = `${minutes}:${seconds.toString().padStart(2, '0')}`;
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

function setPomodoro(columnNum, itemNum) {
  const pomodoro = elementWithClass('i', 'fa-regular');
  pomodoro.classList.add('fa-circle-play');
  pomodoro.classList.add('pomodoro__icon');

  pomodoro.addEventListener('click', lunchPomodoro);

  function lunchPomodoro() {
    const pomodoroText = document.querySelector('.pomodoro__text');
    document.querySelector('.pomodoro__controls').style.display = 'inline-block';

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

export { setPomodoro, startPomodoro, interval };
