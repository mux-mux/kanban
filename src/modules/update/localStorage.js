import { columns, columnNames } from '../data/columns';
import { archive } from '../data/archive';
import { categories } from '../data/categories';

function getLocalItems() {
  const localItems = {};
  columnNames.forEach((column) => {
    let localName = column + 'Items';
    localItems[column] = { items: JSON.parse(localStorage[localName]) };
  });
  return localItems;
}
function setLocalItems(columnItems = columns) {
  columnNames.forEach((column) => {
    localStorage.setItem(`${column}Items`, JSON.stringify(columnItems[column].items));
  });
}

function getLocalArchive() {
  return JSON.parse(localStorage.archiveItems);
}
function setLocalArchive(archiveItems = archive.items) {
  localStorage.setItem('archiveItems', JSON.stringify(archiveItems));
}

function getLocalCategories() {
  return JSON.parse(localStorage.categoriesItems);
}
function setLocalCategories(categoriesItems = categories.items) {
  localStorage.setItem('categoriesItems', JSON.stringify(categoriesItems));
}

function getLocalIsInitialLoad() {
  return JSON.parse(localStorage.isInitialLoad);
}
function setLocalIsInitialLoad() {
  localStorage.setItem('isInitialLoad', JSON.stringify(false));
}

export {
  getLocalItems,
  setLocalItems,
  getLocalArchive,
  setLocalArchive,
  getLocalCategories,
  setLocalCategories,
  getLocalIsInitialLoad,
  setLocalIsInitialLoad,
};
