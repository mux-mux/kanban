import { drag } from './dragDropItem';
import { toggleInputBox } from './addItem';

function createItem(columnElement, columnNum, item, itemNum) {
  const listElement = document.createElement('li');
  listElement.classList.add('drag__list-item');
  listElement.textContent = item;
  listElement.draggable = true;
  listElement.id = itemNum;
  listElement.addEventListener('dragstart', (e) => drag(e));

  hoverAppearIcon(listElement);
  dblclickEditable(listElement);

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

function dblclickEditable(currentelement) {
  currentelement.addEventListener('dblclick', (e) => {
    e.target.setAttribute('contentEditable', true);
    focusEnterEnd(e);
  });
  currentelement.addEventListener('focusout', (e) =>
    e.target.setAttribute('contentEditable', false)
  );
}

function focusEnterEnd(ev) {
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
