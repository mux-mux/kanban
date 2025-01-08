import { columns } from '../data/columns';
import { itemsLoaded } from './updateDOM';
import { archive } from '../data/archive';
import { categories } from '../data/categories';

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
    const firstLoad = itemsLoaded.length < 1 ? columns : itemsLoaded;
    localStorage.setItem(`${column}Items`, JSON.stringify(firstLoad[column].items));
  });
  return columns;
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

function getLocalInitialLoad() {
  return JSON.parse(localStorage.initialLoad);
}
function setLocalInitialLoad() {
  localStorage.setItem('initialLoad', JSON.stringify(false));
}

export {
  getLocalItems,
  setLocalItems,
  getLocalArchive,
  setLocalArchive,
  getLocalCategories,
  setLocalCategories,
  getLocalInitialLoad,
  setLocalInitialLoad,
};
