import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { undoItem } from './undoItem';
import { updateDOM } from '../update/updateDOM';
import { interval } from '../set/pomodoro';

const overallRemoved = [];

function deleteItem(columnNum, itemNum) {
  const selectedList = localLoaded[columnNames[columnNum]];
  const currRemoved = selectedList.items.splice(itemNum, 1);
  overallRemoved.push(`${JSON.stringify(currRemoved)}, ${columnNum}`);
  clearInterval(interval);
  console.log(currRemoved);

  updateDOM();
}

export { deleteItem, overallRemoved };
