import {
  setLocalItems,
  setLocalArchive,
  setLocalCategories,
  setLocalIsInitialLoad,
} from './localStorage';
import updateDOM from './updateDOM';

function initialLoad() {
  const initialLoad = localStorage.getItem('isInitialLoad') === null;

  if (initialLoad) {
    setLocalItems();
    setLocalArchive();
    setLocalCategories();
    setLocalIsInitialLoad();
    updateDOM();
  } else {
    updateDOM();
  }
}

export default initialLoad;
