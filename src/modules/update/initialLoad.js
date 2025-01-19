import { findMaxId } from '../helpers/helpers';
import { setLocalItems, setLocalData } from './localStorage';
import getItems from '../services/ItemsService';
import updateDOM from './updateDOM';

function initialLoad() {
  const initialLoad = localStorage.getItem('isInitialLoad') === null;

  if (initialLoad) {
    getItems('https://api.jsonbin.io/v3/b/67802f76e41b4d34e472bedb').then(
      ({ archive, categories, columns }) => {
        setLocalData('columnNames', Object.keys(columns));
        setLocalItems(columns);
        setLocalData('archiveItems', archive);
        setLocalData('categoriesItems', categories);
        setLocalData('isInitialLoad', false);
        setLocalData('currentId', findMaxId(columns));
        updateDOM();
      }
    );
  } else {
    updateDOM();
  }
}

export default initialLoad;
