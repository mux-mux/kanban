import { getLocalItems, setLocalItems } from './localStorage';
import { columnNames } from '../data/columns';

import { createItem } from '../set/createItem';

const todoElement = document.getElementById('todo-list'),
  inprogressElement = document.getElementById('inprogress-list'),
  doneElement = document.getElementById('done-list'),
  elementsList = [todoElement, inprogressElement, doneElement];

let updatedOnLoad = false;
let localLoaded = [];

function updateDOM() {
  if (!updatedOnLoad) {
    localLoaded = getLocalItems(columnNames);
  }

  elementsList.forEach((element) => (element.textContent = ''));

  columnNames.forEach((column, columnNum) => {
    localLoaded[column].items.forEach((item, itemNum) => {
      createItem(elementsList[columnNum], columnNum, item, itemNum);
    });
  });

  updatedOnLoad = true;
  setLocalItems(columnNames);
}

export { updateDOM, elementsList, localLoaded };
