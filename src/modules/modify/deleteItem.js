import { createElementWithClass, toggleItemIconOpacity, isTouchDevice } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import { pomodoroIntervalTick, removePomodoroTimerListiners } from '../set/pomodoro';
import {
  setLocalCategories,
  getLocalCategories,
  getLocalItems,
  setLocalItems,
} from '../update/localStorage';

const overallRemoved = [];

function deleteItem(type = 'task', columnNum = 0, itemNum = 0) {
  if (type === 'task') {
    const itemsLoaded = getLocalItems();
    removePomodoroTimerListiners();

    const selectedList = itemsLoaded[Object.keys(itemsLoaded)[columnNum]];
    const currRemoved = selectedList.items.splice(itemNum, 1);
    overallRemoved.push(`${JSON.stringify(currRemoved)}, ${columnNum}`);
    setLocalItems(itemsLoaded);
    clearInterval(pomodoroIntervalTick);
  } else if (type === 'category') {
    const categoriesLoaded = getLocalCategories();
    categoriesLoaded.splice(columnNum, 1);
    setLocalCategories(categoriesLoaded);
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
    const itemsLoaded = getLocalItems();
    const taskText = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].name;
    taskDeleteButton.setAttribute('aria-label', `Delete ${taskText} task`);
  } else if (type === 'category') {
    const categoriesLoaded = getLocalCategories();
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
