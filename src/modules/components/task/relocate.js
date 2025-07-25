import checkFunctionParameters from '../../errors/errors';
import { restoreFocus, getFocusedElement } from '../../helpers/helpers';
import updateDOM from '../../update/updateDOM';
import { pomodoroIcon } from './create';
import { getTodayDate } from '../deadline';
import { pomodoroInit } from '../pomodoro';
import { getLocalItems, setLocalItems, getLocalData } from '../../update/localStorage';

function relocateItem(columnNum, itemNum, newColNum, newItemNum) {
  checkFunctionParameters(columnNum, itemNum, newColNum, newItemNum);

  // Validate itemNum to prevent prototype pollution
  if (['__proto__', 'constructor', 'prototype'].includes(itemNum)) {
    throw new Error('Invalid itemNum value');
  }

  const itemsLoaded = getLocalItems();
  const currentColumnItems = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items;
  const newColumnItems = itemsLoaded[Object.keys(itemsLoaded)[newColNum]].items;

  if (!currentColumnItems || !newColumnItems) return;
  if (!currentColumnItems[itemNum]) return;

  const currentItemRemoved = currentColumnItems.splice(itemNum, 1);
  newColumnItems.splice(newItemNum, 0, ...currentItemRemoved);

  const itemData = newColumnItems[newItemNum];

  if (newColNum === 2) {
    itemData.done = getTodayDate();
    pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
  } else if (itemData.done !== '') {
    itemData.done = '';
  }

  setLocalItems(itemsLoaded);
  updateDOM();
}

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
  const doneColumnUnfocusedClassNames = [
    'deadline',
    'deadline deadline-failed',
    'icon icon-pomodoro',
    'icon icon-edit',
  ];
  if (columnNum + 1 === colLength && doneColumnUnfocusedClassNames.includes(lastFocusedClass))
    return;

  restoreFocus(lastFocusedParentId, lastFocusedClass);
}

export { relocateItem, setupKeyboardNavigation };
