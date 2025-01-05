import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { updateDOM } from '../update/updateDOM';
import { pomodoroIcon } from '../set/createItem';
import { todayDate } from '../set/deadline';
import { pomodoroInit } from '../set/pomodoro';

function relocateItem(columnNum, itemNum, newColNum, newItemNum) {
  const selectedList = localLoaded[columnNames[columnNum]].items;
  const newSelectedList = localLoaded[columnNames[newColNum]].items;
  const currRemoved = selectedList.splice(itemNum, 1);
  newSelectedList.splice(newItemNum, 0, currRemoved[0]);

  const itemData = localLoaded[columnNames[newColNum]].items[newItemNum];

  if (newColNum == 2) {
    itemData.done = todayDate();
    pomodoroInit(pomodoroIcon, itemData, 'remove', columnNum, itemNum);
  } else {
    itemData.done = '';
    updateDOM();
  }
}

export { relocateItem };
