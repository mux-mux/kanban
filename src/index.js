import './styles/main.scss';

import { updateDOM } from './modules/kanban/update/updateDOM';
import { getTheme } from './modules/kanban/theme/themeSwitch';
import { archiveItem } from './modules/kanban/modify/archiveItem';

getTheme();
updateDOM();
archiveItem();
