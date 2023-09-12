import { updateLists } from './localStorage';

let draggedItem = null,
  currentColumn = null;

let dragList = document.querySelectorAll('.drag__list');

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

export { drag, allowDrop, drop, dragList };
