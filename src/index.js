import './styles/main.scss';

import { switchTheme } from './modules/theme/themeSwitch';
import { archiveItem } from './modules/modify/archiveItem';
import { addCategories } from './modules/modify/addCategories';
import { setUndoListeners } from './modules/modify/undoItem';
import initialLoad from './modules/update/initialLoad';
import renderButtonsAndFields from './modules/modify/addItem';
import { setPomodoroIsPausedOnReload } from './modules/set/pomodoro';
import { setDragAndDropListeners } from './modules/modify/dragDropItem';

initialLoad();
renderButtonsAndFields();
switchTheme();
archiveItem();
addCategories();
setUndoListeners();
setDragAndDropListeners();
setPomodoroIsPausedOnReload();
