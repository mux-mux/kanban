import { itemsList } from './localStorage';
import { updateDOM } from './updateDOM';
import { overallRemoved } from './deleteItem';

const undoBtn = document.querySelector('.tools__history');

function undoItem(items, removed) {
  const undoItem = removed.pop();

  const [item, column] = undoItem.split(', ');

  const selectedList = items[column];
  selectedList.push(item);

  updateDOM();
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'z') {
    if (overallRemoved.length !== 0) {
      undoItem(itemsList, overallRemoved);
    }
  }
});

undoBtn.addEventListener('click', () => {
  if (overallRemoved.length !== 0) {
    undoItem(itemsList, overallRemoved);
  }
});

export { undoItem };
