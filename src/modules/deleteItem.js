import { itemsList } from './localStorage';
import { updateDOM } from './updateDOM';

function deleteItem(columnNum, itemNum) {
  const selectedList = itemsList[columnNum];
  console.log(selectedList);
  selectedList.splice(itemNum, 1);
  console.log(selectedList.splice(itemNum, 1));

  updateDOM();
}

export { deleteItem };
