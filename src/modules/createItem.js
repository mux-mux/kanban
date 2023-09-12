import { drag } from './dragDropItem';
import { toggleInputBox } from './addItem';
import { updateItem } from './updateItem';
import { deleteItem } from './deleteItem';

function createItem(columnElement, columnNum, item, itemNum) {
  const listElement = elementWithClass('li', 'drag__list-item');
  const removeIcon = elementWithClass('img', 'drag__list-item-remove');
  removeIcon.src = '../assets/remove.png';
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
    e.currentTarget.style.setProperty('--display', 'block');
  });
  currentelement.addEventListener('mouseout', (e) =>
    e.currentTarget.style.setProperty('--display', 'none')
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
      e.currentTarget.children[0].remove();
      e.target.setAttribute('contentEditable', true);
      e.target.setAttribute('draggable', false);
      e.target.focus();
    }
    focusCarretEnd(e);
  });
  currentelement.addEventListener('focusout', (e) => {
    e.target.setAttribute('contentEditable', false);
    e.target.setAttribute('draggable', true);
    updateItem(columnNum, itemNum);
  });
}

function focusCarretEnd(ev) {
  const range = document.createRange();
  range.selectNodeContents(ev.currentTarget);
  range.collapse(false);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  onEnterBlur(ev);
}

function onEnterBlur(ev) {
  ev.target.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      ev.target.blur();
    }
  });
}

export { createItem };
