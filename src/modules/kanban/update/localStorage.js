import { columns } from '../data/columns';
import { localLoaded } from './updateDOM';

function getLocalItems(columnNames) {
  if (localStorage.getItem('todoItems')) {
    const localItems = {};
    columnNames.forEach((column) => {
      let localName = column + 'Items';
      localItems[column] = { items: JSON.parse(localStorage[localName]) };
    });
    return localItems;
  } else {
    return setLocalItems(columnNames);
  }
}

function setLocalItems(columnNames) {
  columnNames.forEach((column) => {
    const firstLoad = localLoaded.length < 1 ? columns : localLoaded;
    localStorage.setItem(`${column}Items`, JSON.stringify(firstLoad[column].items));
  });
  return columns;
}

export { getLocalItems, setLocalItems };
