import checkFunctionParameters from '../errors/errors';

function getSessionRemovedItems() {
  return sessionStorage.getItem('removedItems') ? JSON.parse(sessionStorage.removedItems) : [];
}
function setSessionRemovedItems(removedItems) {
  checkFunctionParameters(removedItems);

  sessionStorage.setItem('removedItems', JSON.stringify(removedItems));
}
export { setSessionRemovedItems, getSessionRemovedItems };
