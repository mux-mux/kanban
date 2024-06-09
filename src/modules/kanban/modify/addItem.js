import { updateDOM, localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { todayDate } from '../set/deadline';

const buttonsOpenTask = document.querySelectorAll('.add__btn-open');
const buttonsSaveTask = document.querySelectorAll('.add__btn-save');
const containersAddNewTask = document.querySelectorAll('.add__container');
const textareaAddNewTask = document.querySelectorAll('.add__item');
const taskLists = document.querySelectorAll('.tasks__list');

const handleKeypress = (e, column) => {
  if (e.ctrlKey && e.code === 'Enter') {
    if (textareaAddNewTask[column].value.length !== 0) {
      textareaAddNewTask[column].value = textareaAddNewTask[column].value + '\n';
    }
  } else if (e.code === 'Enter') {
    e.preventDefault();
    addToColumn(column);
  } else if (e.code === 'Escape') {
    toggleInputBox(column, null);
    textareaAddNewTask[column].value = '';
  }
};

function toggleInputBox(column, state) {
  const addVisibility = state === 'open' ? 'hidden' : 'visible';
  const saveVisibility = state === 'open' ? 'visible' : 'hidden';
  const addDisplay = state === 'open' ? 'block' : 'none';

  buttonsOpenTask[column].style.visibility = addVisibility;
  buttonsSaveTask[column].style.visibility = saveVisibility;
  containersAddNewTask[column].style.display = addDisplay;

  if (state === 'save') {
    addToColumn(column);
  } else if (state === 'open') {
    textareaAddNewTask[column].focus();
    containersAddNewTask[column].scrollIntoView({ block: 'end' });
  }
}

function addToColumn(column) {
  if (textareaAddNewTask[column].value === '') {
    return;
  }
  const itemText = textareaAddNewTask[column].value;
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
  textareaAddNewTask[column].value = '';
  updateDOM();
}

buttonsOpenTask.forEach((addBtn, index) => {
  addBtn.addEventListener('click', () => toggleInputBox(index, 'open'));
});

buttonsSaveTask.forEach((saveBtn, index) => {
  saveBtn.addEventListener('click', () => toggleInputBox(index, 'save'));
});

containersAddNewTask.forEach((taskField, index) => {
  taskField.addEventListener('keydown', (e) => handleKeypress(e, index));
});

export { taskLists };
