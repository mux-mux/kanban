import { taskLists } from './addItem';
import { relocateItem } from '../modify/relocateItem';
import { removePomodoroTimerListiners } from '../set/pomodoro';
import { setProperties } from '../set/createItem';

let draggedItem = null,
  currentColumn = null;

function dragItem(e, columnNum) {
  draggedItem = e.currentTarget;
  const itemNum = draggedItem.attributes['data-in-list'].value;

  e.dataTransfer.clearData();

  e.dataTransfer.setData('columnNum', columnNum);
  e.dataTransfer.setData('itemNum', itemNum);

  setProperties(draggedItem, { '--opacity': '0', '--pointer-events': 'none' });
}

function dragOverItem(e, column) {
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

  taskLists.forEach((column) => column.classList.remove('drag-over'));
  taskLists[column].classList.add('drag-over');
}

function dropItem(e, newColNum) {
  removePomodoroTimerListiners();

  e.preventDefault();

  draggedItem = null;

  taskLists.forEach((list) => {
    list.classList.remove('drag-over');
  });

  const columnNum = e.dataTransfer.getData('columnNum');
  const itemNum = e.dataTransfer.getData('itemNum');

  const newItemNum = Array.from(e.target.parentNode.children).indexOf(e.target);

  relocateItem(columnNum, itemNum, newColNum, newItemNum);
}

taskLists.forEach((list, i) => {
  list.addEventListener('drop', (e) => dropItem(e, i));
  list.addEventListener('dragover', (e) => dragOverItem(e, i));
});

export { dragItem, dropItem };
