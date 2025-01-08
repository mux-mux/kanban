import { getLocalItems, getLocalArchive, getLocalCategories } from './localStorage';

import { columnNames } from '../data/columns';
import { renderArchive } from '../modify/archiveItem';
import { renderCategories } from '../modify/addCategories';
import { renderTasks } from '../set/createItem';

let itemsLoaded = [];
let archiveLoaded = [];
let categoriesLoaded = [];

function updateDOM() {
  itemsLoaded = getLocalItems(columnNames);
  archiveLoaded = getLocalArchive();
  categoriesLoaded = getLocalCategories();
  renderTasks(itemsLoaded);
  renderArchive(archiveLoaded);
  renderCategories(categoriesLoaded);
}

export { updateDOM, itemsLoaded, archiveLoaded, categoriesLoaded };
