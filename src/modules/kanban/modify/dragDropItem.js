import { onDragUpdate } from '../update/updateDOM';
import { dragList } from './addItem';

let draggedItem = null,
  currentColumn = null;

function drag(e) {
  draggedItem = e.currentTarget;

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

function drop(e) {
  e.preventDefault();

  draggedItem = null;

  dragList.forEach((list) => {
    list.classList.remove('over');
  });

  onDragUpdate();
}

dragList.forEach((list, i) => {
  list.addEventListener('drop', (e) => drop(e));
  list.addEventListener('dragover', (e) => dragOver(e, i));
});

export { drag, drop };
