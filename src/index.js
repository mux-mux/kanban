import './styles/main.scss';

import { switchTheme } from './modules/theme/themeSwitch';
import { archiveItem } from './modules/modify/archiveItem';
import { addCategories } from './modules/modify/addCategories';
import { setUndoListeners } from './modules/modify/undoItem';
import initialLoad from './modules/update/initialLoad';

initialLoad();
switchTheme();
archiveItem();
addCategories();
setUndoListeners();
