import { onDragUpdate } from '../update/updateDOM';
import { dragList } from './addItem';

let draggedItem = null,
  currentColumn = null;

function drag(e) {
  draggedItem = e.currentTarget;

  e.dataTransfer.setData('text/html', draggedItem.innerHTML);
  draggedItem.style.setProperty('--display', 'none');
}

function dragEnter(e, column) {
  e.preventDefault();

  const target = e.target;
  if (target && target !== draggedItem && target.nodeName === 'LI') {
    dragList[currentColumn].insertBefore(draggedItem, target.nextSibling);
  }
  if (target.childElementCount === 0) {
    dragList[currentColumn].appendChild(draggedItem);
  }

  dragList[column].classList.add('over');
  currentColumn = column;
}

function dragLeave(column) {
  dragList[column].classList.remove('over');
}

function drop(e) {
  e.preventDefault();

  draggedItem.innerHTML = e.dataTransfer.getData('text/html');
  draggedItem = null;

  dragList.forEach((list) => {
    list.classList.remove('over');
  });

  onDragUpdate();
}

dragList.forEach((list, i) => {
  list.addEventListener('drop', (e) => drop(e));
  list.addEventListener('dragover', (e) => dragEnter(e, i));
  list.addEventListener('dragleave', () => dragLeave(i));
});

export { drag, drop };
