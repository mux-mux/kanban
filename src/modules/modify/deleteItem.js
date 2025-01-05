import { createElementWithClass, toggleItemIconOpacity, isTouchDevice } from '../helpers/helpers';
import { itemsLoaded, updateDOM } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { pomodoroInit, pomodoroIntervalTick, removePomodoroTimerListiners } from '../set/pomodoro';

const overallRemoved = [];

function deleteItem(columnNum, itemNum) {
  removePomodoroTimerListiners();

  const selectedList = itemsLoaded[columnNames[columnNum]];
  const currRemoved = selectedList.items.splice(itemNum, 1);
  overallRemoved.push(`${JSON.stringify(currRemoved)}, ${columnNum}`);
  clearInterval(pomodoroIntervalTick);

  updateDOM();
}

function createDeleteIcon(pomodoroIcon, itemData, action, moveData, columnNum, itemNum) {
  if (columnNum == undefined || itemNum == undefined) {
    throw new Error('createEditIcon function has no required argument value');
  }

  const taskDeleteButton = createElementWithClass('button', 'delete__icon');
  const taskDeleteIcon = createElementWithClass('i', ['fa-solid', 'fa-x']);

  const taskText = itemsLoaded[columnNames[columnNum]].items[itemNum].name;
  taskDeleteButton.setAttribute('aria-label', `Edit ${taskText} task`);

  taskDeleteButton.addEventListener('click', () => {
    pomodoroInit(pomodoroIcon, itemData, action, columnNum, itemNum);
    deleteItem(columnNum, itemNum);
    moveData = {};
  });

  taskDeleteButton.appendChild(taskDeleteIcon);

  !isTouchDevice() &&
    taskDeleteButton.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouchDevice() && taskDeleteButton.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  return taskDeleteButton;
}

export { deleteItem, createDeleteIcon, overallRemoved };
