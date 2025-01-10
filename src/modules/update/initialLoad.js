import {
  setLocalItems,
  setLocalArchive,
  setLocalCategories,
  setLocalIsInitialLoad,
  setLocalColumnNames,
} from './localStorage';

import getItems from '../services/ItemsService';
import { archiveItem } from '../modify/archiveItem';
import { setUndoListeners } from '../modify/undoItem';
import { switchTheme } from '../theme/themeSwitch';
import { addCategories } from '../modify/addCategories';
import renderButtonsAndFields from '../modify/addItem';
import { setPomodoroIsPausedOnReload } from '../set/pomodoro';
import { setDragAndDropListeners } from '../modify/dragDropItem';

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

        archiveItem();
        setUndoListeners();
        renderButtonsAndFields();
        switchTheme();
        addCategories();
        setDragAndDropListeners();
        setPomodoroIsPausedOnReload();

        updateDOM();
      }
    );
  } else {
    updateDOM();
  }
}

export default initialLoad;
