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

  draggedItem.style.setProperty('--display', 'none');
}

function dragOver(e, column) {
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
    dragList[currentColumn].insertBefore(draggedItem, nextElement);
  }
  if (target.childElementCount === 0) {
    dragList[currentColumn].appendChild(draggedItem);
  }

  dragList.forEach((list) => list.classList.remove('over'));

  dragList[column].classList.add('over');
  currentColumn = column;
}

function drop(e, newColNum) {
  const pomodoroContainer = document.getElementById('pomodoro');
  const pomodoroContainerClone = pomodoroContainer.cloneNode(true);

  pomodoroContainer.parentNode.replaceChild(pomodoroContainerClone, pomodoroContainer);

  e.preventDefault();

  draggedItem = null;

  dragList.forEach((list) => {
    list.classList.remove('over');
  });

  const columnNum = e.dataTransfer.getData('columnNum');
  const itemNum = e.dataTransfer.getData('itemNum');

  const newItemNum = Array.from(e.target.parentNode.children).indexOf(e.target);

  relocateItem(columnNum, itemNum, newColNum, newItemNum);
}

dragList.forEach((list, i) => {
  list.addEventListener('drop', (e) => drop(e, i));
  list.addEventListener('dragover', (e) => dragOver(e, i));
});

export { drag, drop };
