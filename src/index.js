import './styles/main.scss';

import initialLoad from './modules/update/initialLoad';
import { archiveItem } from './modules/modify/archiveItem';
import setUndoListeners from './modules/modify/undoItem';
import { switchTheme } from './modules/theme/themeSwitch';
import { addCategories } from './modules/modify/addCategories';
import { renderButtonsAndFields, setAddNewTaskKeysListeners } from './modules/modify/addItem';
import { setDragAndDropListeners } from './modules/modify/dragDropItem';
import { showMoveButton } from './modules/set/createItem';
import { setInfoModalListeners } from './modules/info/showInfo';
import { isTabNavigation } from './modules/helpers/helpers';

initialLoad();
renderButtonsAndFields();
switchTheme();
addCategories();
setDragAndDropListeners();
archiveItem();
setUndoListeners();
setAddNewTaskKeysListeners();
showMoveButton();
setInfoModalListeners();
isTabNavigation();
