import { createFocusTrap } from 'focus-trap';
import { createElementWithClass } from '../../helpers/helpers';
import updateDOM from '../../update/updateDOM';
import { getTodayDate } from '../deadline';
import {
  getLocalData,
  getLocalItems,
  setLocalData,
  setLocalItems,
} from '../../update/localStorage';
import { MAX_LENGTH_TASK } from '../../../constants';

let focusTrap = null;

function renderButtonsAndFields() {
  const containersNewTask = document.querySelectorAll('.task__new');

  containersNewTask.forEach((column, index) => {
    column.appendChild(createTaskButtons(index));
    column.appendChild(createTaskField(index));
  });

  document.addEventListener('click', (e) => handleOutsideClick(e, containersNewTask));
}

function createTaskButtons(columnIndex) {
  const container = createElementWithClass('div', 'task__new-btns');

  const buttons = {
    open: createButton(['btn', 'btn-open', 'btn-open-task'], 'Open the add new task textarea', [
      'fa-regular',
      'fa-square-plus',
    ]),
    add: createButton(['btn', 'btn-add', 'btn-add-task'], 'Confirm adding a new task', [
      'fa-regular',
      'fa-floppy-disk',
    ]),
    move:
      columnIndex !== 2
        ? createButton(['btn', 'btn-move'], 'Move the task to another column', [
            'fa-solid',
            'fa-arrows-up-down',
          ])
        : createButton(['btn-move-done'], '', []),
    close: createButton(['btn', 'btn-close', 'btn-close-task'], 'Close the add new task textarea', [
      'fa-regular',
      'fa-rectangle-xmark',
    ]),
  };

  buttons.open.appendChild(createButtonText('Item'));
  buttons.add.appendChild(createButtonText('Item'));

  Object.values(buttons).forEach((btn) => container.appendChild(btn));

  buttons.open.addEventListener('click', () => toggleTaskTextarea(columnIndex, 'open'));
  buttons.add.addEventListener('click', () => toggleTaskTextarea(columnIndex, 'add'));
  buttons.close.addEventListener('click', () => focusTrap.deactivate());

  return container;
}

function createButton(classes, ariaLabel, iconClasses) {
  const button = createElementWithClass('button', classes);
  button.ariaLabel = ariaLabel;
  if (iconClasses.length) {
    const icon = createElementWithClass('i', iconClasses);
    button.appendChild(icon);
  }
  return button;
}

function createButtonText(text) {
  const span = createElementWithClass('span', 'btn-text');
  span.textContent = text;
  return span;
}

function createTaskField(columnIndex) {
  const fieldContainer = createElementWithClass('div', ['inputs', 'inputs-new-task']);
  const textarea = createElementWithClass('textarea', [
    'textarea',
    'textarea-add',
    'custom-scroll',
  ]);
  textarea.setAttribute('placeholder', 'Ctrl+Enter to a New line\nEsc to Close');
  textarea.maxLength = MAX_LENGTH_TASK;
  textarea.addEventListener('keydown', (e) => handleTaskKeypress(e, columnIndex));
  fieldContainer.appendChild(textarea);

  return fieldContainer;
}

function handleOutsideClick(event, containers) {
  containers.forEach((container) => {
    if (container.style.display === 'block' && !container.contains(event.target)) {
      focusTrap.deactivate();
    }
  });
}

function handleTaskKeypress(event, columnIndex) {
  const textareas = document.querySelectorAll('.textarea-add');

  if (event.ctrlKey && event.code === 'Enter') {
    event.preventDefault();
    textareas[columnIndex].value += '\n';
  } else if (event.code === 'Enter') {
    event.preventDefault();
    addNewTask(columnIndex);
  }
}

function toggleTaskTextarea(columnIndex, state) {
  const buttons = {
    open: document.querySelectorAll('.btn-open-task'),
    add: document.querySelectorAll('.btn-add-task'),
    close: document.querySelectorAll('.btn-close-task'),
  };
  const containers = document.querySelectorAll('.inputs-new-task');
  const textareas = document.querySelectorAll('.textarea-add');
  const containersNewTask = document.querySelectorAll('.task__new');

  const isOpening = state === 'open';
  const isClosing = state === 'close' || state === 'add';

  buttons.open[columnIndex].style.display = isOpening ? 'none' : 'flex';
  buttons.add[columnIndex].style.display = isOpening ? 'flex' : 'none';
  buttons.close[columnIndex].style.visibility = isOpening ? 'visible' : 'hidden';
  containers[columnIndex].style.display = isOpening ? 'block' : 'none';

  if (isOpening) {
    focusTrap = createFocusTrap(containersNewTask[columnIndex], {
      onActivate: () => textareas[columnIndex].focus(),
      onDeactivate: () => toggleTaskTextarea(columnIndex, 'close'),
      allowOutsideClick: true,
      clickOutsideDeactivates: true,
    });
    focusTrap.activate();
  } else if (isClosing) {
    if (state === 'add') addNewTask(columnIndex);
    textareas[columnIndex].value = '';
    focusTrap.deactivate();
  }
}

function addNewTask(columnIndex) {
  const itemsLoaded = getLocalItems();
  const nextId = getLocalData('currentId') + 1;
  const textareas = document.querySelectorAll('.textarea-add');

  const itemText = textareas[columnIndex].value.trim();
  if (!itemText) return;

  const selectedList = Object.keys(itemsLoaded)[columnIndex];
  itemsLoaded[selectedList].items.push({
    id: nextId,
    name: itemText,
    add: getTodayDate(),
    deadline: getTodayDate(),
    pomodoro: false,
    sessions: 0,
    time: '',
    break: false,
    done: columnIndex === 2 ? getTodayDate() : '',
  });

  textareas[columnIndex].value = '';
  setLocalItems(itemsLoaded);
  setLocalData('currentId', nextId);
  updateDOM();
}

function setAddNewTaskKeysListeners() {
  let currentIndex = -1;
  const openButtons = document.querySelectorAll('.btn-open-task');

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === '+') {
      event.preventDefault();
      currentIndex = (currentIndex + 1) % openButtons.length;
      openButtons[currentIndex].focus();
    }
  });
}

export { renderButtonsAndFields, setAddNewTaskKeysListeners };
