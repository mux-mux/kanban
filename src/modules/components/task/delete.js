import checkFunctionParameters from '../../errors/errors';
import {
  createElementWithClass,
  toggleItemIconOpacity,
  isTouchDevice,
} from '../../helpers/helpers';
import updateDOM from '../../update/updateDOM';
import { removePomodoroTimerListiners } from '../pomodoro';
import {
  setLocalData,
  getLocalData,
  removeLocalData,
  getLocalItems,
  setLocalItems,
} from '../../update/localStorage';

import { setSessionRemovedItems, getSessionRemovedItems } from '../../update/sessionStorage';

function deleteItem(type = 'task', columnNum = 0, itemNum = 0) {
  if (type === 'task') {
    delteItemType('task', columnNum, itemNum);
  } else if (type === 'category') {
    delteItemType('category', columnNum);
  }
  updateDOM();
}

function delteItemType(type, columnNum, itemNum = 0) {
  if (type === 'task') {
    removePomodoroTimerListiners();
    const itemsLoaded = getLocalItems();
    const itemsRemoved = getSessionRemovedItems();

    const selectedList = itemsLoaded[Object.keys(itemsLoaded)[columnNum]];
    const removedItem = selectedList.items.splice(itemNum, 1);
    itemsRemoved.push([...removedItem, columnNum]);

    setSessionRemovedItems(itemsRemoved);
    setLocalItems(itemsLoaded);

    const pomodoroIntervalTick = getLocalData('pomodoroInterval');
    clearInterval(pomodoroIntervalTick);
    removeLocalData('pomodoroInterval');
  } else if (type === 'category') {
    const categoriesLoaded = getLocalData('categoriesItems');
    categoriesLoaded.splice(columnNum, 1);
    setLocalData('categoriesItems', categoriesLoaded);
  }
}

function createDeleteIcon(type, columnNum, itemNum = 0) {
  checkFunctionParameters(type, columnNum);

  const deleteButton = createElementWithClass('button', ['icon', 'icon-delete']);
  deleteButton.appendChild(createElementWithClass('i', ['fa-solid', 'fa-x']));

  const ariaLabel = getDeleteAriaLabel(type, columnNum, itemNum);
  if (ariaLabel) {
    deleteButton.ariaLabel = ariaLabel;
  }

  if (!isTouchDevice()) {
    deleteButton.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
    deleteButton.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));
  }

  return deleteButton;
}

function getDeleteAriaLabel(type, columnNum, itemNum) {
  if (type === 'task') {
    const itemsLoaded = getLocalItems();
    const taskText = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items[itemNum]?.name;
    return taskText ? `Delete the ${taskText} task` : null;
  } else if (type === 'category') {
    const categoriesLoaded = getLocalData('categoriesItems');
    const categoryText = categoriesLoaded[columnNum];
    return categoryText ? `Delete the ${categoryText} category` : null;
  }
  return null;
}

export { deleteItem, createDeleteIcon };
