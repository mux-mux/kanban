import './styles/main.scss';

import { getLocalItems, setLocalItems } from './modules/localStorage';

let updatedOnLoad = false;

function updateDOM() {
  if (!updatedOnLoad) {
    getLocalItems();
  }

  updatedOnLoad = true;
  setLocalItems();
}

updateDOM();
