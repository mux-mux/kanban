import { getLocalItems, setLocalItems, columns } from './localStorage';

import { createItem } from './createItem';

const todoElement = document.getElementById('todo-list'),
  inprogressElement = document.getElementById('inprogress-list'),
  doneElement = document.getElementById('done-list'),
  elementsList = [todoElement, inprogressElement, doneElement];

let updatedOnLoad = false;

function updateDOM() {
  let localLoaded = [];

  if (!updatedOnLoad) {
    localLoaded = getLocalItems(columns);
  }

  elementsList.forEach((element) => (element.textContent = ''));

  localLoaded.forEach((items, columnNum) => {
    items.forEach((item, itemNum) => {
      createItem(elementsList[columnNum], columnNum, item, itemNum);
    });
  });

  updatedOnLoad = true;
  setLocalItems(columns);
}

export { updateDOM, elementsList };
