import {
  setLocalItems,
  setLocalArchive,
  setLocalCategories,
  setLocalInitialLoad,
} from './localStorage';
import { updateDOM } from './updateDOM';

import { columnNames } from '../data/columns';

function initialLoad() {
  const initialLoad = localStorage.getItem('initialLoad') === null;

  if (initialLoad) {
    setLocalItems(columnNames);
    setLocalArchive();
    setLocalCategories();
    setLocalInitialLoad();
    updateDOM();
  } else {
    updateDOM();
  }
}

export default initialLoad;
