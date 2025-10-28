import checkFunctionParameters from '../errors/errors';
import { getLocalData, setLocalData } from '../update/localStorage';

function setProperties(element, props) {
  checkFunctionParameters(element, props);

  Object.entries(props).forEach(([key, value]) => element.style.setProperty(key, value));
}

function createElementWithClass(element, className) {
  checkFunctionParameters(element, className);

  const newElement = document.createElement(element);
  Array.isArray(className)
    ? newElement.classList.add(...className)
    : newElement.classList.add(className);
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

function restoreFocus(lastFocusedParentId, lastFocusedClass, type = 'task') {
  checkFunctionParameters(lastFocusedParentId, lastFocusedClass);
  if (!getLocalData('isTabPressed')) return;

  const selectorMap = {
    task: `.task__list-item[data-id="${lastFocusedParentId}"]`,
    category: `.categories__item[data-id="${lastFocusedParentId}"]`,
  };

  const parentElement = document.querySelector(selectorMap[type]);
  if (!parentElement) return;

  const activeElement = parentElement.getElementsByClassName(lastFocusedClass);
  activeElement[0].focus();
}

function getFocusedElement(e, type = 'task') {
  const selectorMap = {
    task: '.task__list-item',
    category: '.categories__item',
  };

  const parentElement = e.target.closest(selectorMap[type]);
  if (!parentElement) return;

  const lastFocusedParentId = parentElement.dataset.id;
  const lastFocusedClass = e.target.className;
  return [lastFocusedParentId, lastFocusedClass];
}

function isTabNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      setLocalData('isTabPressed', true);
    }
  });

  document.addEventListener('mousedown', () => {
    setLocalData('isTabPressed', false);
  });
}

function removeClassNames(queryClass, removeClass) {
  checkFunctionParameters(queryClass, removeClass);
  const elements = document.querySelectorAll(`.${queryClass}`);
  if (elements.length === 0) return;
  elements.forEach((element) => element.classList.remove(removeClass));
}

function checkIncludesName(input, loaded) {
  checkFunctionParameters(input);
  return loaded.some((item) => item.toLowerCase() === input.toLowerCase());
}

export {
  setProperties,
  createElementWithClass,
  isTouchDevice,
  toggleItemIconOpacity,
  restoreFocus,
  getFocusedElement,
  findMaxId,
  isTabNavigation,
  removeClassNames,
  checkIncludesName,
};
