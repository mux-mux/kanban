import { columns } from '../data/columns';
import { localLoaded, archiveLoaded, categoriesLoaded } from './updateDOM';
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

function getLocalArchive() {
  if (localStorage.getItem('archiveItems')) {
    const localArchiveItems = JSON.parse(localStorage.archiveItems);
    return localArchiveItems;
  } else {
    return setLocalArchive();
  }
}

function getLocalCategories() {
  if (localStorage.getItem('categoriesItems')) {
    const localCategories = JSON.parse(localStorage.categoriesItems);
    return localCategories;
  } else {
    return setLocalCategories();
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
  const archiveItems = archiveLoaded.length < 1 ? archive.items : archiveLoaded;
  localStorage.setItem('archiveItems', JSON.stringify(archiveItems));
  return archiveItems;
}

function setLocalCategories() {
  const categoriesItems = categoriesLoaded.length < 1 ? categories.items : categoriesLoaded;
  localStorage.setItem('categoriesItems', JSON.stringify(categoriesItems));
  return categoriesItems;
}

export {
  getLocalItems,
  setLocalItems,
  getLocalArchive,
  setLocalArchive,
  getLocalCategories,
  setLocalCategories,
};
