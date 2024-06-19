import { updateDOM, localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { todayDate } from '../set/deadline';

const buttonsOpenTask = document.querySelectorAll('.add__btn-open');
const buttonsSaveTask = document.querySelectorAll('.add__btn-save');
const containersNewTask = document.querySelectorAll('.task');
const containersTextarea = document.querySelectorAll('.add__container');
const textareas = document.querySelectorAll('.add__item');
const taskLists = document.querySelectorAll('.tasks__list');

function handleKeypress(e, column) {
  if (e.ctrlKey && e.code === 'Enter') {
    if (textareas[column].value.length !== 0) {
      textareas[column].value = textareas[column].value + '\n';
    }
  } else if (e.code === 'Enter') {
    e.preventDefault();
    addNewTask(column);
  } else if (e.code === 'Escape') {
    toggleNewTaskTextarea(column, null);
    textareas[column].value = '';
    document.removeEventListener('click', hideNewTaskTextarea);
  }
}

function hideNewTaskTextarea(e) {
  let column = null;
  containersTextarea.forEach((container, index) => {
    if (container.style.display === 'block') {
      column = index;
    }
  });
  if (column != null && !containersNewTask[column].contains(e.target)) {
    containersTextarea.forEach((container, index) => toggleNewTaskTextarea(index, null));
    document.removeEventListener('click', hideNewTaskTextarea);
  }
}

function toggleNewTaskTextarea(column, state) {
  const buttonOpenVisibility = state === 'open' ? 'hidden' : 'visible';
  const buttonSaveVisibility = state === 'open' ? 'visible' : 'hidden';
  const containerDisplay = state === 'open' ? 'block' : 'none';

  buttonsOpenTask[column].style.visibility = buttonOpenVisibility;
  buttonsSaveTask[column].style.visibility = buttonSaveVisibility;
  containersTextarea[column].style.display = containerDisplay;

  if (state === 'save') {
    addNewTask(column);
    document.removeEventListener('click', hideNewTaskTextarea);
  } else if (state === 'open') {
    textareas[column].focus();
    containersTextarea[column].scrollIntoView({ block: 'end' });
    document.addEventListener('click', hideNewTaskTextarea);
  }
}

function addNewTask(column) {
  if (textareas[column].value === '') {
    return;
  }
  const itemText = textareas[column].value;
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
  textareas[column].value = '';
  updateDOM();
}

buttonsOpenTask.forEach((openBtn, index) => {
  openBtn.addEventListener('click', () => toggleNewTaskTextarea(index, 'open'));
});

buttonsSaveTask.forEach((saveBtn, index) => {
  saveBtn.addEventListener('click', () => toggleNewTaskTextarea(index, 'save'));
});

containersTextarea.forEach((taskField, index) => {
  taskField.addEventListener('keydown', (e) => handleKeypress(e, index));
});

export { taskLists };
