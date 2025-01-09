import { getLocalItems, getLocalArchive, getLocalCategories } from './localStorage';

import { renderArchive } from '../modify/archiveItem';
import { renderCategories } from '../modify/addCategories';
import { renderItems } from '../set/createItem';

function updateDOM() {
  renderItems(getLocalItems());
  renderArchive(getLocalArchive());
  renderCategories(getLocalCategories());
}

export default updateDOM;
