import checkFunctionParameters from '../errors/checkFunctionParameters';
import { createElementWithClass, toggleItemIconOpacity, isTouchDevice } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import { removePomodoroTimerListiners } from '../set/pomodoro';
import {
  setLocalData,
  getLocalData,
  removeLocalData,
  getLocalItems,
  setLocalItems,
} from '../update/localStorage';

import { setSessionRemovedItems, getSessionRemovedItems } from '../update/sessionStorage';

function deleteItem(type = 'task', columnNum = 0, itemNum = 0) {
  const pomodoroIntervalTick = getLocalData('pomodoroInterval');
  if (type === 'task') {
    const itemsLoaded = getLocalItems();
    const itemsRemoved = getSessionRemovedItems();
    removePomodoroTimerListiners();

    const selectedList = itemsLoaded[Object.keys(itemsLoaded)[columnNum]];
    const currRemoved = selectedList.items.splice(itemNum, 1);
    itemsRemoved.push([...currRemoved, columnNum]);

    setSessionRemovedItems(itemsRemoved);
    setLocalItems(itemsLoaded);
    clearInterval(pomodoroIntervalTick);
    removeLocalData('pomodoroInterval');
  } else if (type === 'category') {
    const categoriesLoaded = getLocalData('categoriesItems');
    categoriesLoaded.splice(columnNum, 1);

    setLocalData('categoriesItems', categoriesLoaded);
  }

  updateDOM();
}

function createDeleteIcon(type, columnNum, itemNum = 0) {
  checkFunctionParameters(type, columnNum);

  const taskDeleteButton = createElementWithClass('button', ['icon', 'icon-delete']);
  const taskDeleteIcon = createElementWithClass('i', ['fa-solid', 'fa-x']);

  if (type === 'task') {
    const itemsLoaded = getLocalItems();
    const taskText = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum].name;
    taskDeleteButton.setAttribute('aria-label', `Delete ${taskText} task`);
  } else if (type === 'category') {
    const categoriesLoaded = getLocalData('categoriesItems');
    const categoryText = categoriesLoaded[columnNum];
    taskDeleteButton.setAttribute('aria-label', `Delete ${categoryText} category`);
  }

  taskDeleteButton.appendChild(taskDeleteIcon);

  !isTouchDevice() &&
    taskDeleteButton.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouchDevice() && taskDeleteButton.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  return taskDeleteButton;
}

export { deleteItem, createDeleteIcon };
