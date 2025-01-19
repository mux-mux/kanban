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
  const allIds = Object.values(data)
    .flatMap((column) => column.items)
    .map((item) => item.id);

  return Math.max(...allIds);
}

export { setProperties, createElementWithClass, isTouchDevice, toggleItemIconOpacity, findMaxId };
