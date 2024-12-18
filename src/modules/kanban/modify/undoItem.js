import { columnNames } from '../data/columns';
import { updateDOM, localLoaded } from '../update/updateDOM';
import { overallRemoved } from './deleteItem';

const buttonUndoDelete = document.querySelector('.tool-history');

function undoItem(items, removed) {
  const getBackItem = removed.pop();

  let [item, column] = getBackItem.split(', ');

  const selectedList = items[column];
  const parsedItem = JSON.parse(item)[0];

  localLoaded[selectedList].items.push(parsedItem);

  updateDOM();
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'z') {
    if (overallRemoved.length !== 0) {
      undoItem(columnNames, overallRemoved);
    }
  }
});

buttonUndoDelete.addEventListener('click', () => {
  if (overallRemoved.length !== 0) {
    undoItem(columnNames, overallRemoved);
  }
});

export { undoItem };
