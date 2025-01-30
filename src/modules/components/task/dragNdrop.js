import { setProperties } from '../../helpers/helpers';
import { relocateItem } from './relocate';
import { removePomodoroTimerListiners } from '../pomodoro';

function getDraggedItemData(event) {
  const draggedItem = event.currentTarget;

  return {
    element: draggedItem,
    columnNum: draggedItem.dataset.inCol,
    itemNum: draggedItem.dataset.inRow,
  };
}

function handleDragStart(event) {
  const { element, columnNum, itemNum } = getDraggedItemData(event);

  event.dataTransfer.clearData();
  event.dataTransfer.setData('columnNum', columnNum);
  event.dataTransfer.setData('itemNum', itemNum);

  setProperties(element, { '--opacity': '0', '--pointer-events': 'none' });

  event.currentTarget.classList.add('dragging');
}

function handleDragOver(event) {
  event.preventDefault();

  const target = event.target;
  const draggedItem = document.querySelector('.dragging');
  const taskList = event.currentTarget;

  if (!draggedItem || target === draggedItem) return;

  const getNextElement = (cursorPos, currElem) => {
    const currElemCoord = currElem.getBoundingClientRect();
    const currElemCenter = currElemCoord.y + currElemCoord.height / 2;

    return cursorPos < currElemCenter ? currElem : currElem.nextSibling;
  };

  const nextElement = getNextElement(event.clientY, target);

  if (target && target !== draggedItem && target.nodeName === 'LI') {
    taskList.insertBefore(draggedItem, nextElement);
  }
  if (target.childElementCount === 0) {
    taskList.appendChild(draggedItem);
  }

  document.querySelectorAll('.task__list').forEach((list) => list.classList.remove('drag-over'));
  taskList.classList.add('drag-over');
}

function handleDrop(event) {
  event.preventDefault();
  removePomodoroTimerListiners();

  const draggedItem = document.querySelector('.dragging');
  if (!draggedItem) return;

  draggedItem.classList.remove('dragging');

  const columnNum = event.dataTransfer.getData('columnNum');
  const itemNum = event.dataTransfer.getData('itemNum');
  const newColNum = [...document.querySelectorAll('.task__list')].indexOf(event.currentTarget);
  const newItemNum = [...event.currentTarget.children].indexOf(draggedItem);

  relocateItem(columnNum, itemNum, newColNum, newItemNum);

  document.querySelectorAll('.task__list').forEach((list) => list.classList.remove('drag-over'));
}

function setDragAndDropListeners() {
  document.querySelectorAll('.task__list').forEach((taskList) => {
    taskList.addEventListener('dragover', handleDragOver);
    taskList.addEventListener('drop', handleDrop);
  });
}

export { handleDragStart, setDragAndDropListeners };
