import { dragList } from './addItem';
import { relocateItem } from '../modify/relocateItem';

let draggedItem = null,
  currentColumn = null;

function drag(e, columnNum) {
  draggedItem = e.currentTarget;
  const itemNum = draggedItem.id;

  e.dataTransfer.clearData();

  e.dataTransfer.setData('columnNum', columnNum);
  e.dataTransfer.setData('itemNum', itemNum);
  e.dataTransfer.setData('itemText', e.target.textContent);

  draggedItem.style.setProperty('--display', 'none');
}

function dragOver(e, column) {
  e.preventDefault();

  const target = e.target;
  if (target && target !== draggedItem && target.nodeName === 'LI') {
    dragList[currentColumn].insertBefore(draggedItem, target.nextSibling);
  }
  if (target.childElementCount === 0) {
    dragList[currentColumn].appendChild(draggedItem);
  }

  dragList.forEach((list) => list.classList.remove('over'));

  dragList[column].classList.add('over');
  currentColumn = column;
}

function drop(e, newColNum) {
  e.preventDefault();

  draggedItem = null;

  dragList.forEach((list) => {
    list.classList.remove('over');
  });

  const columnNum = e.dataTransfer.getData('columnNum');
  const itemNum = e.dataTransfer.getData('itemNum');
  const itemText = e.dataTransfer.getData('itemText');

  const newItemNum = itemText !== e.target.textContent ? +e.target.id + 1 : +e.target.id;

  relocateItem(columnNum, itemNum, newColNum, newItemNum);
}

dragList.forEach((list, i) => {
  list.addEventListener('drop', (e) => drop(e, i));
  list.addEventListener('dragover', (e) => dragOver(e, i));
});

export { drag, drop };
