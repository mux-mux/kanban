import { columnNames } from '../data/columns';
import updateDOM from '../update/updateDOM';
import { pomodoroIcon } from '../set/createItem';
import { todayDate } from '../set/deadline';
import { pomodoroInit } from '../set/pomodoro';
import { getLocalItems, setLocalItems } from '../update/localStorage';

function relocateItem(columnNum, itemNum, newColNum, newItemNum) {
  const itemsLoaded = getLocalItems();

  const currentColumnItems = itemsLoaded[columnNames[columnNum]].items;
  const newColumnItems = itemsLoaded[columnNames[newColNum]].items;
  const currentItemRemoved = currentColumnItems.splice(itemNum, 1);
  //Move task into a new position
  newColumnItems.splice(newItemNum, 0, ...currentItemRemoved);

  const itemData = newColumnItems[newItemNum];

  if (newColNum == 2) {
    itemData.done = todayDate();
    pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
  } else {
    itemData.done = '';
  }
  setLocalItems(itemsLoaded);
  updateDOM();
}

export { relocateItem };
