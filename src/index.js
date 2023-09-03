import './styles/main.scss';

import { getSavedColumns, setSavedColumns } from './modules/localStorage';

let updatedOnLoad = false;

function updateDOM() {
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  updatedOnLoad = true;
  setSavedColumns();
}

updateDOM();
