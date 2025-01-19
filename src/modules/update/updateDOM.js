import { getLocalItems, getLocalData } from './localStorage';

import { renderArchive } from '../modify/archiveItem';
import { renderCategories } from '../modify/addCategories';
import { renderItems } from '../set/createItem';

function updateDOM() {
  renderItems(getLocalItems());
  renderArchive(getLocalData('archiveItems'));
  renderCategories(getLocalData('categoriesItems'));
}

export default updateDOM;
