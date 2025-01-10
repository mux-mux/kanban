import './styles/main.scss';

import initialLoad from './modules/update/initialLoad';
import { archiveItem } from './modules/modify/archiveItem';
import { setUndoListeners } from './modules/modify/undoItem';
import { switchTheme } from './modules/theme/themeSwitch';
import { addCategories } from './modules/modify/addCategories';
import renderButtonsAndFields from './modules/modify/addItem';
import { setPomodoroIsPausedOnReload } from './modules/set/pomodoro';
import { setDragAndDropListeners } from './modules/modify/dragDropItem';

initialLoad(setUndoListeners);
renderButtonsAndFields();
switchTheme();
addCategories();
setDragAndDropListeners();
setPomodoroIsPausedOnReload();
archiveItem();
setUndoListeners();
