import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { updateDOM } from '../update/updateDOM';
import { interval } from '../set/pomodoro';

const overallRemoved = [];

function deleteItem(columnNum, itemNum) {
  const selectedList = localLoaded[columnNames[columnNum]];
  const currRemoved = selectedList.items.splice(itemNum, 1);
  overallRemoved.push(`${JSON.stringify(currRemoved)}, ${columnNum}`);
  clearInterval(interval);

  updateDOM();
}

export { deleteItem, overallRemoved };
