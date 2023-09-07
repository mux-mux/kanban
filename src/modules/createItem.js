import { drag } from './dragDropItem';
import { toggleInputBox } from './addItem';

function createItem(columnElement, column, item) {
  const listElement = document.createElement('li');
  listElement.classList.add('drag__list-item');
  listElement.textContent = item;
  listElement.draggable = true;
  listElement.addEventListener('dragstart', (e) => drag(e));
  columnElement.appendChild(listElement);
}
export { createItem };
