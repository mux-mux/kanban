import checkFunctionParameters from '../errors/checkFunctionParameters';
import { createElementWithClass } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
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

  today > currDeadline && columnNum !== 2
    ? (deadlinePick.style.color = '#d02020')
    : (deadlinePick.style.color = '#777');
  deadlinePick.setAttribute('type', 'date');
  deadlinePick.setAttribute('min', today);
  deadlinePick.value = item.deadline;

  deadlinePick.addEventListener('change', (e) => {
    itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].deadline =
      e.currentTarget.value;
    setLocalItems(itemsLoaded);
    updateDOM();
  });

  if (columnNum === 2) {
    deadlinePick.setAttribute('disabled', 'disabled');
  }

  return deadlinePick;
}

export { todayDate, setDeadline };
