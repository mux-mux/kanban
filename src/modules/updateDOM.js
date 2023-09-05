import { getLocalItems, setLocalItems, itemsList } from './localStorage';

import { createItem } from './createItem';

const todoElement = document.getElementById('todo-list'),
  inprogressElement = document.getElementById('inprogress-list'),
  doneElement = document.getElementById('done-list'),
  elementsList = [todoElement, inprogressElement, doneElement];

let updatedOnLoad = false;

function updateDOM() {
  if (!updatedOnLoad) {
    getLocalItems();
  }

  elementsList.forEach((element) => (element.innerHTML = ''));

  itemsList.forEach((items, index) => {
    items.forEach((item) => {
      createItem(elementsList[index], index, item);
    });
  });

  updatedOnLoad = true;
  setLocalItems();
}

export { updateDOM };
