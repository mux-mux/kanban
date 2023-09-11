import { drag } from './dragDropItem';
import { toggleInputBox } from './addItem';
import { updateItem } from './updateItem';

function createItem(columnElement, columnNum, item, itemNum) {
  const listElement = document.createElement('li');
  listElement.classList.add('drag__list-item');
  listElement.textContent = item;
  listElement.draggable = true;
  listElement.id = itemNum;
  listElement.addEventListener('dragstart', (e) => drag(e));

  hoverAppearIcon(listElement);
  dblclickEditable(listElement, columnNum, itemNum);

  columnElement.appendChild(listElement);
}

function hoverAppearIcon(currentelement) {
  currentelement.addEventListener('mouseover', (e) =>
    e.target.style.setProperty('--display', 'initial')
  );
  currentelement.addEventListener('mouseout', (e) =>
    e.target.style.setProperty('--display', 'none')
  );
}

function dblclickEditable(currentelement, columnNum, itemNum) {
  currentelement.addEventListener('dblclick', (e) => {
    e.target.setAttribute('contentEditable', true);
    focusEnterEnd(e, columnNum, itemNum);
  });
  currentelement.addEventListener('focusout', (e) => {
    e.target.setAttribute('contentEditable', false);
    updateItem(columnNum, itemNum);
  });
}

function focusEnterEnd(ev, columnNum, itemNum) {
  ev.target.focus();
  const range = document.createRange();
  range.selectNodeContents(ev.target);
  range.collapse(false);
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
