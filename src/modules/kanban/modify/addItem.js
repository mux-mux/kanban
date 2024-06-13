import { updateDOM, localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { todayDate } from '../set/deadline';

const buttonsOpenTask = document.querySelectorAll('.add__btn-open');
const buttonsSaveTask = document.querySelectorAll('.add__btn-save');
const containersNewTask = document.querySelectorAll('.add__container');
const textareasNewTask = document.querySelectorAll('.add__item');
const taskLists = document.querySelectorAll('.tasks__list');

const handleKeypress = (e, column) => {
  if (e.ctrlKey && e.code === 'Enter') {
    if (textareasNewTask[column].value.length !== 0) {
      textareasNewTask[column].value = textareasNewTask[column].value + '\n';
    }
  } else if (e.code === 'Enter') {
    e.preventDefault();
    addToColumn(column);
  } else if (e.code === 'Escape') {
    toggleInputBox(column, null);
    textareasNewTask[column].value = '';
  }
};

function toggleInputBox(column, state) {
  const buttonOpenVisibility = state === 'open' ? 'hidden' : 'visible';
  const buttonSaveVisibility = state === 'open' ? 'visible' : 'hidden';
  const containerDisplay = state === 'open' ? 'block' : 'none';

  buttonsOpenTask[column].style.visibility = buttonOpenVisibility;
  buttonsSaveTask[column].style.visibility = buttonSaveVisibility;
  containersNewTask[column].style.display = containerDisplay;

  if (state === 'save') {
    addToColumn(column);
  } else if (state === 'open') {
    textareasNewTask[column].focus();
    containersNewTask[column].scrollIntoView({ block: 'end' });
  }
}

function addToColumn(column) {
  if (textareasNewTask[column].value === '') {
    return;
  }
  const itemText = textareasNewTask[column].value;
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
  textareasNewTask[column].value = '';
  updateDOM();
}

buttonsOpenTask.forEach((openBtn, index) => {
  openBtn.addEventListener('click', () => toggleInputBox(index, 'open'));
});

buttonsSaveTask.forEach((saveBtn, index) => {
  saveBtn.addEventListener('click', () => toggleInputBox(index, 'save'));
});

containersNewTask.forEach((taskField, index) => {
  taskField.addEventListener('keydown', (e) => handleKeypress(e, index));
});

export { taskLists };
