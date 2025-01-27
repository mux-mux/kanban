import updateDOM from '../update/updateDOM';
import { pomodoroIcon } from '../set/createItem';
import { getTodayDate } from '../set/deadline';
import { pomodoroInit } from '../set/pomodoro';
import { getLocalItems, setLocalItems } from '../update/localStorage';

function relocateItem(columnNum, itemNum, newColNum, newItemNum) {
  const itemsLoaded = getLocalItems();

  const currentColumnItems = itemsLoaded[Object.keys(itemsLoaded)[columnNum]].items;
  const newColumnItems = itemsLoaded[Object.keys(itemsLoaded)[newColNum]].items;
  const currentItemRemoved = currentColumnItems.splice(itemNum, 1);
  //Move task into a new position
  newColumnItems.splice(newItemNum, 0, ...currentItemRemoved);

  const itemData = newColumnItems[newItemNum];

  newColNum == 2 ? (itemData.done = getTodayDate()) : (itemData.done = '');

  pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
  setLocalItems(itemsLoaded);
  updateDOM();
}

export { relocateItem };
