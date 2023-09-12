import { itemsList } from './localStorage';
import { dragList } from './dragDropItem';
import { updateDOM } from './updateDOM';
import { deleteItem } from './deleteItem';

function updateItem(columnNum, itemNum) {
  const selectedList = itemsList[columnNum];
  const selectedItem = dragList[columnNum].children;

  if (selectedItem[itemNum].textContent === '') {
    deleteItem(columnNum, itemNum);
  } else {
    selectedList[itemNum] = selectedItem[itemNum].textContent;
  }
  updateDOM();
}

export { updateItem };
