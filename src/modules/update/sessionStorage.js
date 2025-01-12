function getSessionRemovedItems() {
  return sessionStorage.getItem('removedItems') ? JSON.parse(sessionStorage.removedItems) : [];
}
function setSessionRemovedItems(removedItems) {
  if (!removedItems) {
    throw new Error('setSessionRemovedItems function has no required argument value');
  }
  sessionStorage.setItem('removedItems', JSON.stringify(removedItems));
}
export { setSessionRemovedItems, getSessionRemovedItems };
