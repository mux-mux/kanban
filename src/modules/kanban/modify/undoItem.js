import { columnNames } from '../data/columns';
import { updateDOM, localLoaded } from '../update/updateDOM';
import { overallRemoved } from './deleteItem';

const undoBtn = document.querySelector('.tools__history');

function undoItem(items, removed) {
  const undoItem = removed.pop();

  const [item, column] = undoItem.split(', ');

  const selectedList = items[column];

  localLoaded[selectedList].items.push(JSON.parse(item)[0]);

  updateDOM();
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'z') {
    if (overallRemoved.length !== 0) {
      undoItem(columnNames, overallRemoved);
    }
  }
});

undoBtn.addEventListener('click', () => {
  if (overallRemoved.length !== 0) {
    undoItem(columnNames, overallRemoved);
  }
});

export { undoItem };