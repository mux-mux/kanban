import {
  setLocalItems,
  setLocalArchive,
  setLocalCategories,
  setLocalIsInitialLoad,
} from './localStorage';
import updateDOM from './updateDOM';
import getItems from '../services/ItemsService';
import { archiveItem } from '../modify/archiveItem';

function initialLoad() {
  const initialLoad = localStorage.getItem('isInitialLoad') === null;

  if (initialLoad) {
    getItems('https://api.jsonbin.io/v3/b/67802f76e41b4d34e472bedb').then(
      ({ archive, categories, columns }) => {
        setLocalItems(columns);
        setLocalArchive(archive);
        setLocalCategories(categories);
        setLocalIsInitialLoad();
        archiveItem();
        updateDOM();
      }
    );
  } else {
    updateDOM();
  }
}

export default initialLoad;
