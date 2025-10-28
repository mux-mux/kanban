import { getLocalItems, getLocalData } from './localStorage';

import { renderArchive } from '../components/archive';
import { renderCategories } from '../components/category';
import { renderItems } from '../components/task/create';

function updateDOM() {
  renderItems(getLocalItems());
  renderArchive(getLocalData('archiveItems'));
  renderCategories(getLocalData('categoriesItems'));
}

export default updateDOM;
