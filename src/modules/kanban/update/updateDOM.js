import { getLocalItems, setLocalItems, getLocalArchive, setLocalArchive } from './localStorage';
import { columnNames } from '../data/columns';
import { renderArchive } from '../modify/archiveItem';
import { createItem } from '../set/createItem';

const todoElement = document.getElementById('todo-list'),
  inprogressElement = document.getElementById('inprogress-list'),
  doneElement = document.getElementById('done-list'),
  elementsList = [todoElement, inprogressElement, doneElement];

let updatedOnLoad = false;
let localLoaded = [];
let archiveLoaded = [];

function updateDOM() {
  if (!updatedOnLoad) {
    localLoaded = getLocalItems(columnNames);
    archiveLoaded = getLocalArchive();
  }

  elementsList.forEach((element) => (element.textContent = ''));

  columnNames.forEach((column, columnNum) => {
    localLoaded[column].items.forEach((item, itemNum) => {
      createItem(elementsList[columnNum], columnNum, item, itemNum);
    });
  });

  renderArchive();

  updatedOnLoad = true;
  setLocalItems(columnNames);
  setLocalArchive();
}

export { updateDOM, elementsList, localLoaded, archiveLoaded };
