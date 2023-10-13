import { createElementWithClass } from './createItem';
import { localLoaded, updateDOM } from '../update/updateDOM';
import { columnNames } from '../data/columns';

function minDeadline() {
  const todayDate = new Date().toISOString().split('T')[0];
  return todayDate;
}

function setDeadline(columnNum, item, itemNum) {
  const deadlinePick = createElementWithClass('input', 'deadline');

  const today = minDeadline();
  let currDaedline = localLoaded[columnNames[columnNum]].items[itemNum].deadline;

  today > currDaedline && columnNum !== 2
    ? (deadlinePick.style.color = '#d02020')
    : (deadlinePick.style.color = '#777');
  deadlinePick.setAttribute('type', 'date');
  deadlinePick.setAttribute('min', today);
  deadlinePick.value = item.deadline;

  deadlinePick.addEventListener('change', (e) => {
    localLoaded[columnNames[columnNum]].items[itemNum].deadline = e.currentTarget.value;
    updateDOM();
  });

  if (columnNum === 2) {
    deadlinePick.setAttribute('disabled', 'disabled');
  }

  return deadlinePick;
}

export { minDeadline, setDeadline };
