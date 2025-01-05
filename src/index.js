import './styles/main.scss';

import { updateDOM } from './modules/update/updateDOM';
import { switchTheme } from './modules/theme/themeSwitch';
import { archiveItem } from './modules/modify/archiveItem';
import { addCategories } from './modules/modify/addCategories';
import { setUndoListeners } from './modules/modify/undoItem';

updateDOM();
switchTheme();
archiveItem();
addCategories();
setUndoListeners();
