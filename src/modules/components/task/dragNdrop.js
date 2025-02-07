import { removeClassNames } from '../../helpers/helpers';
import { relocateItem } from './relocate';
import { removePomodoroTimerListiners } from '../pomodoro';
import { setLocalData } from '../../update/localStorage';

function getDraggedItemData(event) {
  const draggedItem = event.currentTarget;

  return {
    element: draggedItem,
    columnNum: draggedItem.dataset.inCol,
    itemNum: draggedItem.dataset.inRow,
  };
}

function handleDragStart(event) {
  const { columnNum, itemNum } = getDraggedItemData(event);

  event.dataTransfer.clearData();
  event.dataTransfer.setData('columnNum', columnNum);
  event.dataTransfer.setData('itemNum', itemNum);

  setLocalData('isDragged', true);

  event.currentTarget.classList.add('dragging');
}

function handleDragOver(event) {
  event.preventDefault();

  const target = event.target;
  const draggedItem = document.querySelector('.dragging');
  const taskList = event.currentTarget;

  if (!draggedItem || target === draggedItem) return;

  function getNextElement(cursorPos, draggedItem) {
    const siblings = [...taskList.children].filter((el) => el !== draggedItem);

    return (
      siblings.find((el) => {
        const rect = el.getBoundingClientRect();
        return cursorPos < rect.top + rect.height / 2;
      }) || null
    );
  }

  const nextElement = getNextElement(event.clientY, draggedItem);

  function insertToANewPosition() {
    if (nextElement) {
      const rect = nextElement.getBoundingClientRect();
      const shouldInsertAfter = event.clientY > rect.top + rect.height / 2;

      if (shouldInsertAfter) {
        taskList.insertBefore(draggedItem, nextElement.nextSibling);
      } else {
        taskList.insertBefore(draggedItem, nextElement);
      }
    } else {
      taskList.appendChild(draggedItem);
    }
  }

  insertToANewPosition();

  removeClassNames('task__list', 'drag-over');
  taskList.classList.add('drag-over');
}

function handleDrop(event) {
  event.preventDefault();
  removePomodoroTimerListiners();

  const draggedItem = document.querySelector('.dragging');

  const columnNum = event.dataTransfer.getData('columnNum');
  const itemNum = event.dataTransfer.getData('itemNum');
  const newColNum = [...document.querySelectorAll('.task__list')].indexOf(event.currentTarget);
  const newItemNum = [...event.currentTarget.children].indexOf(draggedItem);

  relocateItem(columnNum, itemNum, newColNum, newItemNum);

  handleDragEnd();
}

function handleDragEnd() {
  removeClassNames('dragging', 'dragging');
  removeClassNames('task__list', 'drag-over');
}

function setDragAndDropListeners() {
  document.querySelectorAll('.task__list').forEach((taskList) => {
    taskList.addEventListener('dragover', handleDragOver);
    taskList.addEventListener('drop', handleDrop);
    taskList.addEventListener('dragend', handleDragEnd);
  });
}

export { handleDragStart, setDragAndDropListeners };
