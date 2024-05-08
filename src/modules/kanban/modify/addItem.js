import { updateDOM, localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { todayDate } from '../set/deadline';

const controller = new AbortController();
const { signal } = controller;

const addBtns = document.querySelectorAll('.add__btn-add');
const saveBtns = document.querySelectorAll('.add__btn-save');
const addContainers = document.querySelectorAll('.add__container');
const addItems = document.querySelectorAll('.add__item');
const dragList = document.querySelectorAll('.drag__list');

function toggleInputBox(column, state) {
  const addVisibility = state === 'add' ? 'hidden' : 'visible';
  const saveVisibility = state === 'add' ? 'visible' : 'hidden';
  const addDisplay = state === 'add' ? 'block' : 'none';

  addBtns[column].style.visibility = addVisibility;
  saveBtns[column].style.visibility = saveVisibility;
  addContainers[column].style.display = addDisplay;

  const addKeypressSubmit = (e) => {
    if (e.ctrlKey && e.code === 'Enter') {
      addToColumn(column);
    } else if (e.code === 'Escape') {
      toggleInputBox(column, null);
      addItems[column].value = '';
    }
  };

  if (state === 'save') {
    addToColumn(column);
    controller.any();
  } else {
    addItems[column].addEventListener('keydown', addKeypressSubmit, { signal });
    addItems[column].focus();
    addContainers[column].scrollIntoView({ block: 'end' });
  }
}

function addToColumn(column) {
  if (addItems[column].value === '') {
    return;
  }
  const itemText = addItems[column].value;
  const selectedList = columnNames[column];
  itemText.trim().length > 0
    ? localLoaded[selectedList].items.push({
        name: itemText,
        add: todayDate(),
        deadline: todayDate(),
        pomodoro: false,
        sessions: 0,
        time: '',
        break: false,
        done: column === 2 ? todayDate() : '',
      })
    : null;
  addItems[column].value = '';
  updateDOM();
}

addBtns.forEach((addBtn, index) => {
  addBtn.addEventListener('click', () => toggleInputBox(index, 'add'));
});

saveBtns.forEach((saveBtn, index) => {
  saveBtn.addEventListener('click', () => toggleInputBox(index, 'save'));
});

export { dragList };
