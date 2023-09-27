import { elementWithClass } from './createItem';
import { localLoaded, updateDOM } from '../update/updateDOM';
import { columnNames } from '../data/columns';

function startPomodoroTimer(duration, breakDuration) {
  const pause = document.querySelector('.fa-pause');
  const play = document.querySelector('.fa-play');

  const MM = document.getElementById('minutes');
  const SS = document.getElementById('seconds');

  let timer = duration * 60;
  let isBreak = false;
  let isPause = false;

  pause.addEventListener('click', () => {
    pause.style.display = 'none';
    play.style.display = 'block';
  });

  play.addEventListener('click', () => {
    play.style.display = 'none';
    pause.style.display = 'block';
  });

  if (!isPause) {
    const interval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      MM.textContent = minutes;
      SS.textContent = seconds.toString().padStart(2, '0');

      if (timer <= 0) {
        clearInterval(interval);

        if (isBreak) {
          startPomodoroTimer(duration, breakDuration);
        } else {
          startPomodoroTimer(breakDuration, duration);
        }
      }

      timer--;
    }, 1000);
  }
}

function setPomodoro(columnNum, itemNum) {
  const pomodoroText = document.querySelector('.pomodoro__text');

  const pomodoro = elementWithClass('i', 'fa-regular');
  pomodoro.classList.add('fa-circle-play');
  pomodoro.classList.add('pomodoro__icon');

  pomodoro.addEventListener('click', (e) => {
    startPomodoroTimer(25, 5);
    document.querySelector('.pomodoro__controls').style.display = 'inline-block';

    pomodoroText.textContent = e.target.parentElement.innerText;

    for (const columnKey in localLoaded) {
      const column = localLoaded[columnKey];

      for (const item of column.items) {
        item.pomodoro = false;
      }
    }

    localLoaded[columnNames[columnNum]].items[itemNum].pomodoro = true;

    e.currentTarget.style.cssText = 'display: block; color: #eccb34';
    e.currentTarget.classList.add('fa-fade');
  });

  return pomodoro;
}

export { setPomodoro };
