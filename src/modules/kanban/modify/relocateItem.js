import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { updateDOM } from '../update/updateDOM';
import { pomodoroInit } from '../set/createItem';
import { setPomodoro } from '../set/pomodoro';
import { interval } from '../set/pomodoro';

function relocateItem(columnNum, itemNum, newColNum, newItemNum) {
  const selectedList = localLoaded[columnNames[columnNum]];
  const newSelectedList = localLoaded[columnNames[newColNum]].items;
  const currRemoved = selectedList.items.splice(itemNum, 1);
  newSelectedList.splice(newItemNum, 0, currRemoved[0]);

  if (newColNum == 2) {
    const itemData = localLoaded[columnNames[newColNum]].items[newItemNum];
    clearInterval(interval);
    pomodoroInit(setPomodoro(columnNum, itemNum), itemData, 'remove', columnNum, itemNum);
  } else {
    updateDOM();
  }
}

export { relocateItem };
