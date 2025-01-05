function setProperties(el, props) {
  if (!el || !props) {
    throw new Error('setProperties function has no required argument value');
  }

  for (const [key, value] of Object.entries(props)) {
    el.style.setProperty(key, value);
  }
}

function createElementWithClass(element, clazz) {
  if (!element || !clazz) {
    throw new Error('createElementWithClass function has no required argument value');
  }

  const newElement = document.createElement(element);
  Array.isArray(clazz) ? newElement.classList.add(...clazz) : newElement.classList.add(clazz);
  return newElement;
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
}

function toggleItemIconOpacity(e, state) {
  e.target.offsetParent.style.setProperty('--opacity', state);
}

export { setProperties, createElementWithClass, isTouchDevice, toggleItemIconOpacity };
