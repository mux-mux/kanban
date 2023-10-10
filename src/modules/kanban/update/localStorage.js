import { columns } from '../data/columns';
import { localLoaded, archiveLoaded } from './updateDOM';
import { archive } from '../data/archive';

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

function getLocalArchive() {
  if (localStorage.getItem('archiveItems')) {
    const localArchiveItems = JSON.parse(localStorage.archiveItems);
    return localArchiveItems;
  } else {
    return setLocalArchive();
  }
}

function setLocalItems(columnNames) {
  columnNames.forEach((column) => {
    const firstLoad = localLoaded.length < 1 ? columns : localLoaded;
    localStorage.setItem(`${column}Items`, JSON.stringify(firstLoad[column].items));
  });
  return columns;
}

function setLocalArchive() {
  localStorage.setItem('archiveItems', JSON.stringify(archive.items));
  return archive.items;
}

export { getLocalItems, setLocalItems, getLocalArchive, setLocalArchive };
