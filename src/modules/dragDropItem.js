import { updateLists } from './localStorage';
import { dragList } from './addItem';

let draggedItem = null,
  currentColumn = null;

function drag(e) {
  draggedItem = e.currentTarget;
  draggedItem.style.setProperty('--display', 'none');
}

function dragEnter(column) {
  dragList[column].classList.add('over');
  currentColumn = column;
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();

  dragList.forEach((list) => {
    list.classList.remove('over');
  });

  const parent = dragList[currentColumn];
  parent.appendChild(draggedItem);

  updateLists();
}

dragList.forEach((list, i) => {
  list.addEventListener('dragover', (e) => allowDrop(e));
  list.addEventListener('drop', (e) => drop(e));
  list.addEventListener('dragenter', () => dragEnter(i));
});

export { drag, allowDrop, drop };
