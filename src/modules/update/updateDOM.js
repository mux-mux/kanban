import {
  getLocalItems,
  setLocalItems,
  getLocalArchive,
  setLocalArchive,
  getLocalCategories,
  setLocalCategories,
} from './localStorage';

import { columnNames } from '../data/columns';
import { renderArchive } from '../modify/archiveItem';
import { renderCategories } from '../modify/addCategories';
import { createItem } from '../set/createItem';

let updatedOnLoad = false;
let itemsLoaded = [];
let archiveLoaded = [];
let categoriesLoaded = [];

function updateDOM() {
  const todoElement = document.getElementById('todo-list'),
    inprogressElement = document.getElementById('inprogress-list'),
    doneElement = document.getElementById('done-list'),
    elementsList = [todoElement, inprogressElement, doneElement];

  if (!updatedOnLoad) {
    itemsLoaded = getLocalItems(columnNames);
    archiveLoaded = getLocalArchive();
    categoriesLoaded = getLocalCategories();
    renderArchive(archiveLoaded);
    renderCategories(categoriesLoaded);
  }

  elementsList.forEach((element) => (element.textContent = ''));

  columnNames.forEach((column, columnNum) => {
    itemsLoaded[column].items.forEach((item, itemNum) => {
      createItem(elementsList[columnNum], columnNum, item, itemNum);
    });
  });

  updatedOnLoad = true;
  setLocalItems(columnNames);
  setLocalArchive();
  setLocalCategories();
}

export { updateDOM, itemsLoaded, archiveLoaded, categoriesLoaded, updatedOnLoad };
