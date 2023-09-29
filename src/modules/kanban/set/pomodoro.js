import { elementWithClass } from './createItem';
import { localLoaded, updateDOM } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { setLocalItems } from '../update/localStorage';

function startPomodoro(duration, breakDuration, pomodoro, columnNum, itemNum) {
  const MM = document.getElementById('minutes');
  const SS = document.getElementById('seconds');
  const pause = document.querySelector('.fa-pause');
  const play = document.querySelector('.fa-play');
  const itemData = localLoaded[columnNames[columnNum]].items[itemNum];

  let timer = duration * 60;
  let isBreak = false;
  let isPause = false;

  pause.addEventListener('click', () => {
    pause.style.display = 'none';
    play.style.display = 'block';
    isPause = true;
    pomodoro.classList.remove('fa-fade');
  });

  play.addEventListener('click', () => {
    play.style.display = 'none';
    pause.style.display = 'block';
    isPause = false;
    pomodoro.classList.add('fa-fade');
  });

  function pomodoroLogic() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    MM.textContent = minutes;
    SS.textContent = seconds.toString().padStart(2, '0');

    if (timer <= 0) {
      clearInterval(interval);
      itemData.pomodoro = false;
      itemData.session++;

      if (isBreak) {
        startPomodoro(duration, breakDuration);
      } else {
        startPomodoro(breakDuration, duration);
      }
    }
    if (!isPause) {
      timer--;
    }
    if (itemData.pomodoro === true) {
      itemData.time = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    setLocalItems(columnNames);
  }

  pomodoroLogic();

  const interval = setInterval(pomodoroLogic, 3000);
}

function setPomodoro(columnNum, itemNum) {
  const pomodoro = elementWithClass('i', 'fa-regular');
  pomodoro.classList.add('fa-circle-play');
  pomodoro.classList.add('pomodoro__icon');

  pomodoro.addEventListener('click', lunchPomodoro);

  function lunchPomodoro() {
    const pomodoroText = document.querySelector('.pomodoro__text');
    startPomodoro(25, 5, pomodoro, columnNum, itemNum);
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

export { setPomodoro, startPomodoro };
