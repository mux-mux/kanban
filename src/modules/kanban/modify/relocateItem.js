import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { updateDOM } from '../update/updateDOM';
import { pomodoroInit, pomodoroIcon } from '../set/createItem';
import { todayData } from '../set/deadline';

function relocateItem(columnNum, itemNum, newColNum, newItemNum) {
  const selectedList = localLoaded[columnNames[columnNum]].items;
  const newSelectedList = localLoaded[columnNames[newColNum]].items;
  const currRemoved = selectedList.splice(itemNum, 1);
  newSelectedList.splice(newItemNum, 0, currRemoved[0]);

  if (newColNum == 2) {
    const itemData = localLoaded[columnNames[newColNum]].items[newItemNum];
    itemData.done = todayData();
    pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
  } else {
    updateDOM();
  }
}

export { relocateItem };
