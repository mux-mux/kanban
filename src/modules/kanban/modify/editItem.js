import { columnNames } from '../data/columns';
import { updateDOM, localLoaded } from '../update/updateDOM';
import { taskLists } from './addItem';
import { deleteItem } from './deleteItem';
import { toggleItemIconOpacity } from '../set/pomodoro';
import { createElementWithClass, isTouch } from '../set/createItem';

function editItem(columnNum, itemNum) {
  const selectedList = columnNames[columnNum];
  const selectedItem = taskLists[columnNum].children;

  if (selectedItem[itemNum].textContent === '') {
    deleteItem(columnNum, itemNum);
  } else {
    localLoaded[selectedList].items[itemNum].name = selectedItem[itemNum].textContent;
  }
  updateDOM();
}

function createEditIcon(columnNum, itemNum) {
  if (columnNum == undefined || itemNum == undefined) {
    throw new Error('createEditIcon function has no required argument value');
  }

  const editButton = createElementWithClass('button', 'edit__icon');
  const editIcon = createElementWithClass('i', ['fa-solid', 'fa-pencil']);

  const taskText = localLoaded[columnNames[columnNum]].items[itemNum].name;
  editButton.setAttribute('aria-label', `Edit ${taskText} task`);

  editButton.appendChild(editIcon);

  editButton.addEventListener('click', () => editItem(columnNum, itemNum));
  !isTouch && editButton.addEventListener('focus', (e) => toggleItemIconOpacity(e, 1));
  !isTouch && editButton.addEventListener('blur', (e) => toggleItemIconOpacity(e, 0));

  return editButton;
}

export { editItem, createEditIcon };
