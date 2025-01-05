import { createElementWithClass } from '../helpers/helpers';
import { itemsLoaded, updateDOM } from '../update/updateDOM';
import { columnNames } from '../data/columns';

function todayDate() {
  const todayDate = new Date().toISOString().split('T')[0];
  return todayDate;
}

function setDeadline(columnNum, item, itemNum) {
  if (columnNum == undefined || !item || itemNum == undefined) {
    throw new Error('setDeadline function has no required argument value');
  }

  const deadlinePick = createElementWithClass('input', 'deadline');

  const today = todayDate();
  let currDeadline = itemsLoaded[columnNames[columnNum]].items[itemNum].deadline;

  today > currDeadline && columnNum !== 2
    ? (deadlinePick.style.color = '#d02020')
    : (deadlinePick.style.color = '#777');
  deadlinePick.setAttribute('type', 'date');
  deadlinePick.setAttribute('min', today);
  deadlinePick.value = item.deadline;

  deadlinePick.addEventListener('change', (e) => {
    itemsLoaded[columnNames[columnNum]].items[itemNum].deadline = e.currentTarget.value;
    updateDOM();
  });

  if (columnNum === 2) {
    deadlinePick.setAttribute('disabled', 'disabled');
  }

  return deadlinePick;
}

export { todayDate, setDeadline };
