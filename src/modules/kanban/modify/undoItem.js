import { columnNames } from '../data/columns';
import { minDeadline } from '../set/deadline';
import { updateDOM, localLoaded } from '../update/updateDOM';
import { overallRemoved } from './deleteItem';

const undoBtn = document.querySelector('.tools-history');

function undoItem(items, removed, state) {
  const getBackItem = removed.pop();

  let [item, column] = getBackItem.split(', ');

  column = state === 'done' ? 2 : column;

  const selectedList = items[column];
  const parsedItem = JSON.parse(item)[0];

  if (state === 'done') {
    parsedItem.done = minDeadline();
  }
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

undoBtn.addEventListener('click', () => {
  if (overallRemoved.length !== 0) {
    undoItem(columnNames, overallRemoved);
  }
});

export { undoItem };
