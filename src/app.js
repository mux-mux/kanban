import './styles/main.scss';

import initialLoad from './modules/update/initialLoad';
import { archiveItem } from './modules/components/archive';
import setUndoListeners from './modules/components/task/undo';
import { switchTheme } from './modules/theme/themeSwitch';
import { addCategories } from './modules/components/category';
import { renderButtonsAndFields, setAddNewTaskKeysListeners } from './modules/components/task/add';
import { setDragAndDropListeners } from './modules/components/task/dragNdrop';
import { showMoveButton, setSelectOnTouchListener } from './modules/components/task/create';
import setInfoModalListeners from './modules/components/info';
import { isTabNavigation } from './modules/helpers/helpers';

initialLoad();
renderButtonsAndFields();
switchTheme();
addCategories();
archiveItem();
setUndoListeners();
setDragAndDropListeners();
setAddNewTaskKeysListeners();
setInfoModalListeners();
setSelectOnTouchListener();
showMoveButton();
isTabNavigation();
