import checkFunctionParameters from '../errors/checkFunctionParameters';
import { createElementWithClass } from '../helpers/helpers';
import { getLocalItems, setLocalItems } from '../update/localStorage';

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function toggleFailedColor(deadlineInput, isFailed) {
  deadlineInput.classList.toggle('deadline-failed', isFailed);
}

function updateDeadlineStyle(nextDate, deadlineInput, notDoneColumn) {
  const today = getTodayDate();
  const isFailed = today > nextDate && notDoneColumn;
  toggleFailedColor(deadlineInput, isFailed);
}

function setDeadline(columnNum, item, itemNum) {
  checkFunctionParameters(columnNum, item, itemNum);

  const deadlineInput = createElementWithClass('input', 'deadline');
  const itemsLoaded = getLocalItems();
  const today = getTodayDate();
  let currentItem = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum];
  const notDoneColumn = columnNum !== 2;

  deadlineInput.type = 'date';
  deadlineInput.min = today;
  deadlineInput.ariaLabel = `Change the deadline for the ${currentItem.name} task`;
  deadlineInput.value = currentItem.deadline || today;
  updateDeadlineStyle(currentItem.deadline, deadlineInput, notDoneColumn);

  if (!notDoneColumn) {
    deadlineInput.disabled = true;
  } else {
    deadlineInput.addEventListener('change', (e) => {
      const newDeadline = e.currentTarget.value;
      updateDeadlineStyle(newDeadline, deadlineInput, notDoneColumn);

      currentItem.deadline = newDeadline;
      setLocalItems(itemsLoaded);
    });
  }

  return deadlineInput;
}

export { getTodayDate, setDeadline };
