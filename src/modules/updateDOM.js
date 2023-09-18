import { getLocalItems, setLocalItems, columnNames } from './localStorage';

import { createItem } from './createItem';

const todoElement = document.getElementById('todo-list'),
  inprogressElement = document.getElementById('inprogress-list'),
  doneElement = document.getElementById('done-list'),
  elementsList = [todoElement, inprogressElement, doneElement];

let updatedOnLoad = false;

function updateDOM() {
  let localLoaded = [];

  if (!updatedOnLoad) {
    localLoaded = getLocalItems(columnNames);
  }

  console.log(localLoaded);

  elementsList.forEach((element) => (element.textContent = ''));

  columnNames.forEach((column, columnNum) => {
    localLoaded[column].items.forEach((item, itemNum) => {
      console.log(elementsList[columnNum], columnNum, item, itemNum);
      createItem(elementsList[columnNum], columnNum, item, itemNum);
    });
  });

  updatedOnLoad = true;
  setLocalItems(columnNames);
}

export { updateDOM, elementsList };
