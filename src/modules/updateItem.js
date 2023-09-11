import { itemsList } from './localStorage';
import { dragList } from './dragDropItem';
import { updateDOM } from './updateDOM';

function updateItem(columnNum, itemNum) {
  const selectedList = itemsList[columnNum];
  const selectedItem = dragList[columnNum].children;

  if (selectedItem[itemNum].textContent === '') {
    selectedList.splice(itemNum, 1);
  } else {
    selectedList[itemNum] = selectedItem[itemNum].textContent;
  }
  updateDOM();
}

export { updateItem };
