import {
  setLocalItems,
  setLocalArchive,
  setLocalCategories,
  setLocalIsInitialLoad,
  setLocalColumnNames,
} from './localStorage';

import getItems from '../services/ItemsService';

import updateDOM from './updateDOM';

function initialLoad() {
  const initialLoad = localStorage.getItem('isInitialLoad') === null;

  if (initialLoad) {
    getItems('https://api.jsonbin.io/v3/b/67802f76e41b4d34e472bedb').then(
      ({ archive, categories, columns }) => {
        setLocalColumnNames(Object.keys(columns));
        setLocalItems(columns);
        setLocalArchive(archive);
        setLocalCategories(categories);
        setLocalIsInitialLoad();
        updateDOM();
      }
    );
  } else {
    updateDOM();
  }
}

export default initialLoad;
