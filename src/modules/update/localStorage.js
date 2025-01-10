function getLocalItems() {
  const localItems = {};
  getLocalColumnNames().forEach((column) => {
    let localName = column + 'Items';
    localItems[column] = { items: JSON.parse(localStorage[localName]) };
  });
  return localItems;
}
function setLocalItems(columnItems) {
  if (!columnItems) {
    throw new Error('setLocalItems function has no required argument value');
  }
  Object.keys(columnItems).forEach((column) => {
    localStorage.setItem(`${column}Items`, JSON.stringify(columnItems[column].items));
  });
}

function getLocalArchive() {
  return JSON.parse(localStorage.archiveItems);
}
function setLocalArchive(archiveItems) {
  if (!archiveItems) {
    throw new Error('setLocalArchive function has no required argument value');
  }
  localStorage.setItem('archiveItems', JSON.stringify(archiveItems));
}

function getLocalCategories() {
  return JSON.parse(localStorage.categoriesItems);
}
function setLocalCategories(categoriesItems) {
  if (!categoriesItems) {
    throw new Error('setLocalCategories function has no required argument value');
  }
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
  if (isPaused === undefined) {
    throw new Error('setLocalIsPaused function has no required argument value');
  }
  localStorage.setItem('isPaused', JSON.stringify(isPaused));
}

function getLocalColumnNames() {
  return JSON.parse(localStorage.columnNames);
}
function setLocalColumnNames(columnNames) {
  if (!columnNames) {
    throw new Error('setLocalColumnNames function has no required argument value');
  }
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
