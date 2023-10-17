import { updateDOM, localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { todayDate } from '../set/deadline';

const addBtns = document.querySelectorAll('.add__btn-add');
const saveBtns = document.querySelectorAll('.add__btn-save');
const addContainers = document.querySelectorAll('.add__container');
const addItems = document.querySelectorAll('.add__item');
const dragList = document.querySelectorAll('.drag__list');

function toggleInputBox(column, state) {
  const visibleState = state === 'show' ? 'hidden' : 'visible';
  const displayStyle = state === 'show' ? 'block' : 'none';
  const transitionStyle = state === 'show' ? 'unset' : 'all 0.3s ease-in';

  addBtns[column].style.visibility = visibleState;
  addBtns[column].style.transition = transitionStyle;
  saveBtns[column].style.display = displayStyle;
  addContainers[column].style.display = displayStyle;

  if (state === 'add') {
    addToColumn(column);
  }
}

function addToColumn(column) {
  const itemText = addItems[column].textContent;
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
  addItems[column].textContent = '';
  updateDOM();
}

addBtns.forEach((addBtn, index) => {
  addBtn.addEventListener('click', () => toggleInputBox(index, 'show'));
});

saveBtns.forEach((saveBtn, index) => {
  saveBtn.addEventListener('click', () => toggleInputBox(index, 'add'));
});

export { dragList };
