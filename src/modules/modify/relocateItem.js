import { columnNames } from '../data/columns';
import updateDOM from '../update/updateDOM';
import { pomodoroIcon } from '../set/createItem';
import { todayDate } from '../set/deadline';
import { pomodoroInit } from '../set/pomodoro';
import { getLocalItems, setLocalItems } from '../update/localStorage';

function relocateItem(columnNum, itemNum, newColNum, newItemNum) {
  const itemsLoaded = getLocalItems();

  const selectedList = itemsLoaded[columnNames[columnNum]].items;
  const currRemoved = selectedList.splice(itemNum, 1);
  const itemData = itemsLoaded[columnNames[newColNum]].items[newItemNum];

  itemsLoaded[columnNames[columnNum]].items.splice(itemNum, 1);
  itemsLoaded[columnNames[newColNum]].items.splice(newItemNum, 0, currRemoved[0]);

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
