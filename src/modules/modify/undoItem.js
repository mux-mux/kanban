import checkFunctionParameters from '../errors/checkFunctionParameters';
import updateDOM from '../update/updateDOM';
import { getLocalItems, setLocalItems, getLocalData } from '../update/localStorage';
import { setSessionRemovedItems, getSessionRemovedItems } from '../update/sessionStorage';

function undoItem(columnNames, removedItems) {
  checkFunctionParameters(columnNames, removedItems);

  const itemsLoaded = getLocalItems();
  const [item, columnIndex] = removedItems.pop();
  const columnName = columnNames[columnIndex];

  if (!itemsLoaded[columnName]) return;

  itemsLoaded[columnName].items.push(item);
  setSessionRemovedItems(removedItems);
  setLocalItems(itemsLoaded);
  updateDOM();
}

function setUndoListeners() {
  const buttonUndoDelete = document.querySelector('.tool-history');

  function handleUndoItem() {
    const removedItems = getSessionRemovedItems();
    const columnNames = getLocalData('columnNames');

    if (removedItems.length !== 0) {
      undoItem(columnNames, removedItems);
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'z') {
      handleUndoItem();
    }
  });

  buttonUndoDelete.addEventListener('click', handleUndoItem);
}

export default setUndoListeners;
