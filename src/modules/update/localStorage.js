import checkFunctionParameters from '../errors/checkFunctionParameters';

function getLocalItems() {
  const localItems = {};
  getLocalColumnNames().forEach((column) => {
    let localName = column + 'Items';
    localItems[column] = { items: JSON.parse(localStorage[localName]) };
  });
  return localItems;
}
function setLocalItems(columnItems) {
  checkFunctionParameters(columnItems);
  Object.keys(columnItems).forEach((column) => {
    localStorage.setItem(`${column}Items`, JSON.stringify(columnItems[column].items));
  });
}

function getLocalArchive() {
  return JSON.parse(localStorage.archiveItems);
}
function setLocalArchive(archiveItems) {
  checkFunctionParameters(archiveItems);
  localStorage.setItem('archiveItems', JSON.stringify(archiveItems));
}

function getLocalCategories() {
  return JSON.parse(localStorage.categoriesItems);
}
function setLocalCategories(categoriesItems) {
  checkFunctionParameters(categoriesItems);
  localStorage.setItem('categoriesItems', JSON.stringify(categoriesItems));
}

function getLocalIsInitialLoad() {
  return JSON.parse(localStorage.isInitialLoad);
}
function setLocalIsInitialLoad() {
  localStorage.setItem('isInitialLoad', JSON.stringify(false));
}

function getLocalIsPaused() {
  return JSON.parse(localStorage.isPaused);
}
function setLocalIsPaused(isPaused) {
  checkFunctionParameters(isPaused);
  localStorage.setItem('isPaused', JSON.stringify(isPaused));
}

function getLocalColumnNames() {
  return JSON.parse(localStorage.columnNames);
}
function setLocalColumnNames(columnNames) {
  checkFunctionParameters(columnNames);
  localStorage.setItem('columnNames', JSON.stringify(columnNames));
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
  getLocalIsPaused,
  setLocalIsPaused,
  getLocalColumnNames,
  setLocalColumnNames,
};
