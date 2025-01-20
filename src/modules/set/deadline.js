import checkFunctionParameters from '../errors/checkFunctionParameters';
import { createElementWithClass } from '../helpers/helpers';
import { getLocalItems, setLocalItems } from '../update/localStorage';

function todayDate() {
  const todayDate = new Date().toISOString().split('T')[0];
  return todayDate;
}

function setDeadline(columnNum, item, itemNum) {
  checkFunctionParameters(columnNum, item, itemNum);

  const deadlinePick = createElementWithClass('input', 'deadline');
  const itemsLoaded = getLocalItems();

  const today = todayDate();
  let currDeadline = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].deadline;

  checkTheDayBeforeToday(currDeadline, deadlinePick);
  deadlinePick.setAttribute('type', 'date');
  deadlinePick.setAttribute('min', today);
  deadlinePick.value = item.deadline;

  deadlinePick.addEventListener('change', (e) => {
    const nextDate = e.currentTarget.value;
    checkTheDayBeforeToday(nextDate, deadlinePick);
    itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].deadline = nextDate;

    setLocalItems(itemsLoaded);
  });

  function checkTheDayBeforeToday(nextDate, deadlinePick) {
    today > nextDate && columnNum !== 2
      ? (deadlinePick.style.color = '#d02020')
      : (deadlinePick.style.color = '#777');
  }

  if (columnNum === 2) {
    deadlinePick.setAttribute('disabled', 'disabled');
  }

  return deadlinePick;
}

export { todayDate, setDeadline };
