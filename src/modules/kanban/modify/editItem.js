import { columnNames } from '../data/columns';
import { updateDOM, localLoaded } from '../update/updateDOM';
import { taskLists } from './addItem';
import { deleteItem } from './deleteItem';

function editItem(columnNum, itemNum) {
  const selectedList = columnNames[columnNum];
  const selectedItem = taskLists[columnNum].children;

  if (selectedItem[itemNum].textContent === '') {
    deleteItem(columnNum, itemNum);
  } else {
    localLoaded[selectedList].items[itemNum].name = selectedItem[itemNum].textContent;
  }
  updateDOM();
}

export { editItem };
