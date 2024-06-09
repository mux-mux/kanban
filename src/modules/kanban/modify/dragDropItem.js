import { taskLists } from './addItem';
import { relocateItem } from '../modify/relocateItem';
import { removeControlListiners } from '../set/pomodoro';

let draggedItem = null,
  currentColumn = null;

function drag(e, columnNum) {
  draggedItem = e.currentTarget;
  const itemNum = draggedItem.attributes['data-in-list'].value;

  e.dataTransfer.clearData();

  e.dataTransfer.setData('columnNum', columnNum);
  e.dataTransfer.setData('itemNum', itemNum);

  draggedItem.style.setProperty('--visibility', 'hidden');
}

function dragOver(e, column) {
  currentColumn = column;
  e.preventDefault();

  const target = e.target;

  const getNextElement = (cursorPos, currElem) => {
    const currElemCoord = currElem.getBoundingClientRect();
    const currElemCenter = currElemCoord.y + currElemCoord.height / 2;

    const nextElement = cursorPos < currElemCenter ? currElem : currElem.nextSibling;

    return nextElement;
  };

  const nextElement = getNextElement(e.clientY, target);

  if (target && target !== draggedItem && target.nodeName === 'LI') {
    taskLists[currentColumn].insertBefore(draggedItem, nextElement);
  }
  if (target.childElementCount === 0) {
    taskLists[currentColumn].appendChild(draggedItem);
  }

  taskLists.forEach((column) => column.classList.remove('over'));
  taskLists[column].classList.add('over');
}

function drop(e, newColNum) {
  removeControlListiners();

  e.preventDefault();

  draggedItem = null;

  taskLists.forEach((list) => {
    list.classList.remove('over');
  });

  const columnNum = e.dataTransfer.getData('columnNum');
  const itemNum = e.dataTransfer.getData('itemNum');

  const newItemNum = Array.from(e.target.parentNode.children).indexOf(e.target);

  relocateItem(columnNum, itemNum, newColNum, newItemNum);
}

taskLists.forEach((list, i) => {
  list.addEventListener('drop', (e) => drop(e, i));
  list.addEventListener('dragover', (e) => dragOver(e, i));
});

export { drag, drop };
