import updateDOM from '../update/updateDOM';
import { getLocalItems, setLocalItems, getLocalData } from '../update/localStorage';
import { setSessionRemovedItems, getSessionRemovedItems } from '../update/sessionStorage';

function undoItem(columnNames, removed) {
  const itemsLoaded = getLocalItems();
  const getBackItem = removed.pop();
  const [item, column] = getBackItem;
  const selectedList = columnNames[column];

  itemsLoaded[selectedList].items.push(item);
  setSessionRemovedItems(removed);
  setLocalItems(itemsLoaded);

  updateDOM();
}

function setUndoListeners() {
  const buttonUndoDelete = document.querySelector('.tool-history');

  function handleUndoItem() {
    const itemsRemoved = getSessionRemovedItems();
    const columnNames = getLocalData('columnNames');

    if (itemsRemoved.length !== 0) {
      undoItem(columnNames, itemsRemoved);
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'z') {
      handleUndoItem();
    }
  });

  buttonUndoDelete.addEventListener('click', () => {
    handleUndoItem();
  });
}

export default setUndoListeners;
