import updateDOM from '../update/updateDOM';
import { overallRemoved } from './deleteItem';
import { getLocalItems, setLocalItems } from '../update/localStorage';

function undoItem(items, removed) {
  const itemsLoaded = getLocalItems();

  const getBackItem = removed.pop();

  let [item, column] = getBackItem.split(', ');

  const selectedList = items[column];
  const parsedItem = JSON.parse(item)[0];

  itemsLoaded[selectedList].items.push(parsedItem);
  setLocalItems(itemsLoaded);

  updateDOM();
}

function setUndoListeners() {
  const buttonUndoDelete = document.querySelector('.tool-history');
  const itemsLoaded = getLocalItems();

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'z') {
      if (overallRemoved.length !== 0) {
        undoItem(Object.keys(itemsLoaded), overallRemoved);
      }
    }
  });

  buttonUndoDelete.addEventListener('click', () => {
    if (overallRemoved.length !== 0) {
      undoItem(Object.keys(itemsLoaded), overallRemoved);
    }
  });
}

export { setUndoListeners };
