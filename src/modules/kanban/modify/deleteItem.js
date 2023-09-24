import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { undoItem } from './undoItem';
import { updateDOM } from '../update/updateDOM';

const overallRemoved = [];

function deleteItem(columnNum, itemNum) {
  const selectedList = localLoaded[columnNames[columnNum]];
  const currRemoved = selectedList.items.splice(itemNum, 1);
  overallRemoved.push(`${JSON.stringify(currRemoved)}, ${columnNum}`);

  updateDOM();
}

export { deleteItem, overallRemoved };
