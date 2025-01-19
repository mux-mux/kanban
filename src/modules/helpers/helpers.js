import checkFunctionParameters from '../errors/checkFunctionParameters';

function setProperties(element, props) {
  checkFunctionParameters(element, props);

  for (const [key, value] of Object.entries(props)) {
    element.style.setProperty(key, value);
  }
}

function createElementWithClass(element, clazz) {
  checkFunctionParameters(element, clazz);

  const newElement = document.createElement(element);
  Array.isArray(clazz) ? newElement.classList.add(...clazz) : newElement.classList.add(clazz);
  return newElement;
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
}

function toggleItemIconOpacity(e, state) {
  checkFunctionParameters(state);
  e.target.offsetParent.style.setProperty('--opacity', state);
}

function findMaxId(data) {
  checkFunctionParameters(data);
  const allIds = Object.values(data)
    .flatMap((column) => column.items)
    .map((item) => item.id);

  return Math.max(...allIds);
}

function restoreFocus(lastFocusedParentId, lastFocusedClass) {
  checkFunctionParameters(lastFocusedParentId, lastFocusedClass);

  const currentFocusedItem = document.querySelector(`[data-id="${lastFocusedParentId}"]`);
  const currentActiveElement = currentFocusedItem.getElementsByClassName(lastFocusedClass);
  if (!currentActiveElement.length) return;
  currentActiveElement[0].focus();
}

function getFocusedElement(e) {
  const lastFocusedParentId = e.target.closest('.task__list-item').dataset.id;
  const lastFocusedClass = e.target.className;
  if (!lastFocusedParentId) return;
  return [lastFocusedParentId, lastFocusedClass];
}

export {
  setProperties,
  createElementWithClass,
  isTouchDevice,
  toggleItemIconOpacity,
  restoreFocus,
  getFocusedElement,
  findMaxId,
};
