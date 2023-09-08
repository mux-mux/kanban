import { drag } from './dragDropItem';
import { toggleInputBox } from './addItem';
import { updateItem } from './updateItem';

function createItem(columnElement, columnNum, item, itemNum) {
  const listElement = document.createElement('li');
  listElement.classList.add('drag__list-item');
  listElement.textContent = item;
  listElement.draggable = true;
  listElement.contentEditable = true;
  listElement.id = itemNum;
  listElement.addEventListener('dragstart', (e) => drag(e));
  listElement.addEventListener('focusout', (e) => updateItem(itemNum, columnNum));
  columnElement.appendChild(listElement);
}
export { createItem };
