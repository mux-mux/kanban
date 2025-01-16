import { setProperties } from '../helpers/helpers';
import { relocateItem } from './relocateItem';
import { removePomodoroTimerListiners } from '../set/pomodoro';

let draggedItem = null,
  currentColumn = null;

function dragItem(e, columnNum) {
  draggedItem = e.currentTarget;
  const itemNum = draggedItem.attributes['data-in-row'].value;

  e.dataTransfer.clearData();

  e.dataTransfer.setData('columnNum', columnNum);
  e.dataTransfer.setData('itemNum', itemNum);

  setProperties(draggedItem, { '--opacity': '0', '--pointer-events': 'none' });
}

function dragOverItem(e, column) {
  const taskLists = document.querySelectorAll('.task__list');
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
  const taskLists = document.querySelectorAll('.task__list');
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

function setDragAndDropListeners() {
  const taskLists = document.querySelectorAll('.task__list');

  taskLists.forEach((list, i) => {
    list.addEventListener('drop', (e) => dropItem(e, i));
    list.addEventListener('dragover', (e) => dragOverItem(e, i));
  });
}

export { dragItem, dropItem, setDragAndDropListeners };
