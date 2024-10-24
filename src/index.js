import './styles/main.scss';

import { updateDOM } from './modules/kanban/update/updateDOM';
import { getTheme } from './modules/kanban/theme/themeSwitch';
import { archiveItem } from './modules/kanban/modify/archiveItem';
import { addCategories } from './modules/kanban/modify/addCategories';

updateDOM();
getTheme();
archiveItem();
addCategories();
