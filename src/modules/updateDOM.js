import { getLocalItems, setLocalItems, listArrays, itemsList } from './localStorage';

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

  elementsList.forEach((element) => (element.textContent = ''));

  itemsList.forEach((items, columnNum) => {
    items.forEach((item, itemNum) => {
      createItem(elementsList[columnNum], columnNum, item, itemNum);
    });
  });

  updatedOnLoad = true;
  setLocalItems(listArrays, itemsList);
}

export { updateDOM, elementsList };
