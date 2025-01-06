import { createElementWithClass, toggleItemIconOpacity, isTouchDevice } from '../helpers/helpers';
import { itemsLoaded, categoriesLoaded, updateDOM } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { pomodoroIntervalTick, removePomodoroTimerListiners } from '../set/pomodoro';

const overallRemoved = [];

function deleteItem(type, columnNum = 0, itemNum = 0) {
  if (type === 'task') {
    removePomodoroTimerListiners();

    const selectedList = itemsLoaded[columnNames[columnNum]];
    const currRemoved = selectedList.items.splice(itemNum, 1);
    overallRemoved.push(`${JSON.stringify(currRemoved)}, ${columnNum}`);
    clearInterval(pomodoroIntervalTick);
  } else if (type === 'category') {
    categoriesLoaded.splice(columnNum, 1);
  }

  updateDOM();
}

function createDeleteIcon(type = 'task', columnNum = 0, itemNum = 0) {
  if (columnNum == undefined || itemNum == undefined) {
    throw new Error('createEditIcon function has no required argument value');
  }

  const taskDeleteButton = createElementWithClass('button', 'delete__icon');
  const taskDeleteIcon = createElementWithClass('i', ['fa-solid', 'fa-x']);

  if (type === 'task') {
    const taskText = itemsLoaded[columnNames[columnNum]].items[itemNum].name;
    taskDeleteButton.setAttribute('aria-label', `Delete ${taskText} task`);
  } else if (type === 'category') {
    const categoryText = categoriesLoaded[columnNum];
    taskDeleteButton.setAttribute('aria-label', `Delete ${categoryText} category`);
  }

  taskDeleteButton.appendChild(taskDeleteIcon);

  !isTouchDevice() &&
    taskDeleteButton.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouchDevice() && taskDeleteButton.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  return taskDeleteButton;
}

export { deleteItem, createDeleteIcon, overallRemoved };
