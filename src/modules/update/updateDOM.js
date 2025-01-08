import { getLocalItems, getLocalArchive, getLocalCategories } from './localStorage';

import { columnNames } from '../data/columns';
import { renderArchive } from '../modify/archiveItem';
import { renderCategories } from '../modify/addCategories';
import { renderTasks } from '../set/createItem';

let itemsLoaded = [];
let archiveLoaded = [];

function updateDOM() {
  itemsLoaded = getLocalItems(columnNames);
  archiveLoaded = getLocalArchive();
  renderTasks(itemsLoaded);
  renderArchive(archiveLoaded);
  renderCategories(getLocalCategories());
}

export { updateDOM, itemsLoaded, archiveLoaded };
