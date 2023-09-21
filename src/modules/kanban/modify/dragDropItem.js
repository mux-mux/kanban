import { onDragUpdate } from '../update/updateDOM';
import { dragList } from './addItem';

let draggedItem = null,
  currentColumn = null;

function drag(e) {
  draggedItem = e.currentTarget;
  draggedItem.style.setProperty('--display', 'none');
}

function dragEnter(e, column) {
  e.preventDefault();
  dragList[column].classList.add('over');
  currentColumn = column;
}

function dragLeave(column) {
  dragList[column].classList.remove('over');
}

function drop(e) {
  e.preventDefault();

  dragList.forEach((list) => {
    list.classList.remove('over');
  });

  const parent = dragList[currentColumn];
  parent.appendChild(draggedItem);

  onDragUpdate();
}

dragList.forEach((list, i) => {
  list.addEventListener('drop', (e) => drop(e));
  list.addEventListener('dragover', (e) => dragEnter(e, i));
  list.addEventListener('dragleave', () => dragLeave(i));
});

export { drag, drop };
