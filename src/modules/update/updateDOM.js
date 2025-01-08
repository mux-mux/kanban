import { getLocalItems, getLocalArchive, getLocalCategories } from './localStorage';

import { columnNames } from '../data/columns';
import { renderArchive } from '../modify/archiveItem';
import { renderCategories } from '../modify/addCategories';
import { renderTasks } from '../set/createItem';

let itemsLoaded = [];

function updateDOM() {
  itemsLoaded = getLocalItems(columnNames);
  renderTasks(itemsLoaded);
  renderArchive(getLocalArchive());
  renderCategories(getLocalCategories());
}

export { updateDOM, itemsLoaded };
