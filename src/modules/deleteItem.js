import { itemsList } from './localStorage';
import { undoItem } from './undoItem';
import { updateDOM } from './updateDOM';

const overallRemoved = [];

function deleteItem(columnNum, itemNum) {
  const selectedList = itemsList[columnNum];
  const currRemoved = selectedList.splice(itemNum, 1);
  currRemoved.toString().replace(',', ' ');
  overallRemoved.push(`${currRemoved}, ${columnNum}`);
  updateDOM();
}

export { deleteItem, overallRemoved };
