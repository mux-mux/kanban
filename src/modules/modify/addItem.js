import { createFocusTrap } from 'focus-trap';
import { createElementWithClass } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { todayDate } from '../set/deadline';
import { getLocalItems, setLocalItems } from '../update/localStorage';

//Dynamically render new task fields and buttons
const containersNewTask = document.querySelectorAll('.task__new');
renderNewTaskButtons(containersNewTask);
renderNewTaskFields(containersNewTask);

const buttonsOpenTask = document.querySelectorAll('.btn-open-task');
const buttonsAddTask = document.querySelectorAll('.btn-add-task');
const buttonsCloseTask = document.querySelectorAll('.btn-close-task');
const containersTextarea = document.querySelectorAll('.inputs-new-task');
const textareas = document.querySelectorAll('.textarea-add');
const taskLists = document.querySelectorAll('.task__list');
let focusTrap = null;

function renderNewTaskFields(columns) {
  columns.forEach((column) => {
    const fieldContainer = createElementWithClass('div', ['inputs', 'inputs-new-task']);

    const textareaElement = createElementWithClass('textarea', [
      'textarea',
      'textarea-add',
      'custom-scroll',
    ]);
    textareaElement.setAttribute('placeholder', 'Ctrl+Enter to New line\nEsc to Close');
    fieldContainer.appendChild(textareaElement);

    column.appendChild(fieldContainer);
  });
}

function renderNewTaskButtons(columns) {
  columns.forEach((column, i) => {
    const buttonsContainer = createElementWithClass('div', 'btns');

    const closeButton = createElementWithClass('button', ['btn', 'btn-close', 'btn-close-task']);
    const openButton = createElementWithClass('button', ['btn', 'btn-open', 'btn-open-task']);
    const moveButton =
      i !== 2
        ? createElementWithClass('button', ['btn', 'btn-move'])
        : createElementWithClass('button', 'btn-move-done');
    const addButton = createElementWithClass('button', ['btn', 'btn-add', 'btn-add-task']);

    closeButton.setAttribute('aria-label', 'Close add new task textarea');
    openButton.setAttribute('aria-label', 'Open add new task textarea');
    i !== 2
      ? moveButton.setAttribute('aria-label', 'Move task to another column')
      : moveButton.setAttribute('tabindex', '-1');
    addButton.setAttribute('aria-label', 'Confirm add new task');

    const closeIcon = createElementWithClass('i', [
      'btn-close-inner',
      'fa-regular',
      'fa-rectangle-xmark',
    ]);
    const openIcon = createElementWithClass('i', ['fa-regular', 'fa-square-plus']);
    const moveIcon = createElementWithClass('i', ['fa-solid', 'fa-arrows-up-down']);
    const addIcon = createElementWithClass('i', ['fa-regular', 'fa-floppy-disk']);

    closeButton.appendChild(closeIcon);
    openButton.appendChild(openIcon);
    i !== 2 && moveButton.appendChild(moveIcon);
    addButton.appendChild(addIcon);

    for (let i = 0; i < 2; i++) {
      const buttonText = createElementWithClass('span', 'btn-text');

      buttonText.textContent = 'Item';

      i === 0 && openButton.appendChild(buttonText);
      i === 1 && addButton.appendChild(buttonText);
    }

    [openButton, addButton, moveButton, closeButton].forEach((btn) => {
      buttonsContainer.appendChild(btn);
    });

    column.appendChild(buttonsContainer);
  });
}

function handleNewTaskKeypress(e, column) {
  if (e.ctrlKey && e.code === 'Enter') {
    if (textareas[column].value.length !== 0) {
      textareas[column].value = textareas[column].value + '\n';
    }
  } else if (e.code === 'Enter') {
    e.preventDefault();
    addNewTask(column);
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
    toggleNewTaskTextarea(column, null);
    document.removeEventListener('click', hideNewTaskTextarea);
  }
}

function toggleNewTaskTextarea(column, state) {
  focusTrap && focusTrap.deactivate();

  const buttonOpenStyle = state === 'open' ? 'none' : 'flex';
  const buttonAddStyle = state === 'open' ? 'flex' : 'none';
  const buttonCloseStyle = state === 'open' ? 'visible' : 'hidden';
  const containerStyle = state === 'open' ? 'block' : 'none';

  buttonsOpenTask[column].style.display = buttonOpenStyle;
  buttonsAddTask[column].style.display = buttonAddStyle;
  buttonsCloseTask[column].style.visibility = buttonCloseStyle;
  containersTextarea[column].style.display = containerStyle;

  focusTrap = createFocusTrap(containersNewTask[column], {
    onActivate: () => textareas[column].focus(),
    onDeactivate: () => {
      textareas[column].blur();
      toggleNewTaskTextarea(column, 'close');
    },
    onPause: () => focusTrap.deactivate(),
    allowOutsideClick: () => true,
    clickOutsideDeactivates: () => true,
  });

  if (state === 'add' || state === 'close') {
    state === 'add' && addNewTask(column);
    textareas[column].value = '';
    document.removeEventListener('click', hideNewTaskTextarea);
    focusTrap.deactivate();
  } else if (state === 'open') {
    containersTextarea[column].scrollIntoView({ block: 'end' });
    document.addEventListener('click', hideNewTaskTextarea);
    focusTrap.activate();
  }
}

function addNewTask(column) {
  const itemsLoaded = getLocalItems();

  if (textareas[column].value === '') {
    return;
  }
  const itemText = textareas[column].value;
  const selectedList = columnNames[column];
  itemText.trim().length > 0
    ? itemsLoaded[selectedList].items.push({
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
  setLocalItems(itemsLoaded);
  updateDOM();
}

buttonsOpenTask.forEach((openBtn, index) => {
  openBtn.addEventListener('click', () => toggleNewTaskTextarea(index, 'open'));
});

buttonsAddTask.forEach((addBtn, index) => {
  addBtn.addEventListener('click', () => toggleNewTaskTextarea(index, 'add'));
});

buttonsCloseTask.forEach((closeBtn, index) => {
  closeBtn.addEventListener('click', () => toggleNewTaskTextarea(index, 'close'));
});

containersTextarea.forEach((taskField, index) => {
  taskField.addEventListener('keydown', (e) => handleNewTaskKeypress(e, index));
});

export { taskLists };
