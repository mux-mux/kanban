import checkFunctionParameters from '../errors/checkFunctionParameters';
import { restoreFocus, getFocusedElement } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import { pomodoroIcon } from '../set/createItem';
import { getTodayDate } from '../set/deadline';
import { pomodoroInit } from '../set/pomodoro';
import { getLocalItems, setLocalItems, getLocalData } from '../update/localStorage';

function setupKeyboardNavigation(taskContainer, columnNum, itemNum) {
  checkFunctionParameters(taskContainer, columnNum, itemNum);
  const moveTaskHandler = (e) => moveTask(e, columnNum, itemNum);

  taskContainer.addEventListener('focusin', (e) => {
    e.target.addEventListener('keydown', moveTaskHandler);
  });

  taskContainer.addEventListener('focusout', (e) => {
    e.target.removeEventListener('keydown', moveTaskHandler);
  });
}

function moveTask(e, columnNum, itemNum) {
  checkFunctionParameters(columnNum, itemNum);
  if (!(e.ctrlKey && e.shiftKey)) return;

  e.preventDefault();
  const [lastFocusedParentId, lastFocusedClass] = getFocusedElement(e);
  const itemsLoaded = getLocalItems();
  const colLength = getLocalData('columnNames').length - 1;
  const itemsInCol = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items.length - 1;

  switch (e.key) {
    case 'ArrowRight':
      relocateItem(columnNum, itemNum, columnNum === colLength ? 0 : columnNum + 1, 0);
      break;
    case 'ArrowLeft':
      relocateItem(columnNum, itemNum, columnNum === 0 ? colLength : columnNum - 1, 0);
      break;
    case 'ArrowUp':
      relocateItem(columnNum, itemNum, columnNum, itemNum === 0 ? itemsInCol : itemNum - 1);
      break;
    case 'ArrowDown':
      relocateItem(columnNum, itemNum, columnNum, itemNum === itemsInCol ? 0 : itemNum + 1);
      break;
  }
  restoreFocus(lastFocusedParentId, lastFocusedClass);
}

function relocateItem(columnNum, itemNum, newColNum, newItemNum) {
  checkFunctionParameters(columnNum, itemNum, newColNum, newItemNum);
  const itemsLoaded = getLocalItems();

  const currentColumnItems = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items;
  const newColumnItems = itemsLoaded[Object.keys(itemsLoaded)[newColNum]].items;

  if (!currentColumnItems || !newColumnItems) return;
  if (!currentColumnItems[itemNum]) return;

  const currentItemRemoved = currentColumnItems.splice(itemNum, 1);
  newColumnItems.splice(newItemNum, 0, ...currentItemRemoved);

  const itemData = newColumnItems[newItemNum];

  itemData.done = newColNum === 2 ? getTodayDate() : '';

  pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
  setLocalItems(itemsLoaded);
  updateDOM();
}

export { relocateItem, setupKeyboardNavigation };
