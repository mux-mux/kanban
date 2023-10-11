import { elementWithClass, isPause } from './createItem';
import { localLoaded, updateDOM } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { setLocalItems } from '../update/localStorage';

let interval = null;

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
    const minutes = Math.floor(tick / 60);
    const seconds = tick % 60;

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
      tick--;
      MM.textContent = minutes < 10 ? `0${minutes}` : minutes;
      SS.textContent = seconds < 10 ? `0${seconds}` : seconds;
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
