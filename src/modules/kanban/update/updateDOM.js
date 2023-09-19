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
    // console.log(localLoaded[columnNames[index]].items);
    localLoaded[columnNames[index]].items = Array.from(element.children).map((item) => {
      // console.dir(item);
      console.log(item.childNodes.indexOf('input.deadline'));
      // { name: item.textContent, deadline: '2023-09-19', pomodoro: false, sessions: 0 }
    });
  });
  updateDOM();
}

export { updateDOM, onDragUpdate, elementsList, localLoaded };
