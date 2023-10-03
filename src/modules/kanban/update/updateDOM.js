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

function onDragUpdate() {
  elementsList.forEach((element, index) => {
    localLoaded[columnNames[index]].items = Array.from(element.children).map((item) => {
      const deadlineIndex = Array.from(item.children).findIndex((child) =>
        child.classList.contains('deadline')
      );
      return {
        name: item.textContent,
        deadline: item.children[deadlineIndex].value,
        pomodoro: false,
        sessions: 0,
      };
    });
  });
  updateDOM();
}

export { updateDOM, onDragUpdate, elementsList, localLoaded };
