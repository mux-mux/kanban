import { localLoaded } from './updateDOM';
import { columnNames } from './localStorage';
// import { undoItem } from './undoItem';
import { updateDOM } from './updateDOM';

const overallRemoved = [];

function deleteItem(columnNum, itemNum) {
  const selectedList = localLoaded[columnNames[columnNum]];
  const currRemoved = selectedList.items.splice(itemNum, 1);
  currRemoved.toString().replace(',', ' ');
  overallRemoved.push(`${currRemoved}, ${columnNum}`);
  updateDOM();
}

export { deleteItem, overallRemoved };
