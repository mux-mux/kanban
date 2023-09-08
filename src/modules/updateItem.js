import { updateDOM } from './updateDOM';
import { itemsList } from './localStorage';

function updateItem(id, column) {
  const columnList = document.querySelectorAll('.drag__list');
  const selectedList = itemsList[column];
  const element = selectedList[id];

  if (!selectedList[id].textContent) {
    delete selectedList[id];
  }
  console.log(selectedList);
  updateDOM();
}

export { updateItem };
