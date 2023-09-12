import { drag } from './dragDropItem';
import { toggleInputBox } from './addItem';
import { updateItem } from './updateItem';
import { deleteItem } from './deleteItem';

function createItem(columnElement, columnNum, item, itemNum) {
  const listElement = elementWithClass('li', 'drag__list-item');
  const removeIcon = elementWithClass('span', 'drag__list-item-remove');
  removeIcon.textContent = 'X';
  removeIcon.addEventListener('click', () => {
    deleteItem(columnNum, itemNum);
  });

  listElement.textContent = item;
  listElement.draggable = true;
  listElement.id = itemNum;
  listElement.addEventListener('dragstart', (e) => drag(e));

  hoverAppearIcon(listElement);
  dblClickEdit(listElement, columnNum, itemNum, removeIcon, listElement);

  listElement.appendChild(removeIcon);
  columnElement.appendChild(listElement);
}

function hoverAppearIcon(currentelement) {
  currentelement.addEventListener('mouseover', (e) => {
    e.target.style.setProperty('--display', 'block');
  });
  currentelement.addEventListener('mouseout', (e) =>
    e.target.style.setProperty('--display', 'none')
  );
}

function elementWithClass(element, clazz) {
  const newElement = document.createElement(element);
  newElement.classList.add(clazz);
  return newElement;
}

function dblClickEdit(currentelement, columnNum, itemNum, removeIcon) {
  currentelement.addEventListener('dblclick', (e) => {
    if (e.currentTarget.children[0] === removeIcon) {
      e.currentTarget.children[0].textContent = '';
      e.target.setAttribute('contentEditable', true);
    }
    focusEnterEnd(e);
  });
  currentelement.addEventListener('focusout', (e) => {
    e.target.setAttribute('contentEditable', false);
    updateItem(columnNum, itemNum);
  });
}

function focusEnterEnd(ev) {
  ev.target.focus();
  const range = document.createRange();
  range.selectNodeContents(ev.target);
  // range.collapse(false);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  ev.target.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      ev.target.blur();
    }
  });
}

export { createItem };
