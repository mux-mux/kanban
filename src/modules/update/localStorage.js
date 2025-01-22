import checkFunctionParameters from '../errors/checkFunctionParameters';

function getLocalItems() {
  const localItems = {};
  getLocalData('columnNames').forEach((column) => {
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

function getLocalData(localData) {
  checkFunctionParameters(localData);
  return localStorage.getItem(localData) && JSON.parse(localStorage[localData]);
}
function setLocalData(name, localData) {
  checkFunctionParameters(localData);
  localStorage.setItem(name, JSON.stringify(localData));
}

function removeLocalData(localData) {
  checkFunctionParameters(localData);
  localStorage.getItem(localData) && localStorage.removeItem(localData);
}
export { getLocalItems, setLocalItems, getLocalData, setLocalData, removeLocalData };
