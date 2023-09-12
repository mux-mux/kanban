import { itemsList } from './localStorage';
import { updateDOM } from './updateDOM';

function deleteItem(columnNum, itemNum) {
  const selectedList = itemsList[columnNum];
  selectedList.splice(itemNum, 1);

  updateDOM();
}

export { deleteItem };
