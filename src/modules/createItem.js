function createItem(columnElement, column, item) {
  const listElement = document.createElement('li');
  listElement.classList.add('drag__list-item');
  listElement.textContent = item;
  columnElement.appendChild(listElement);
}

export { createItem };
