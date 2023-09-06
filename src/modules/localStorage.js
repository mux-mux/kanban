import { updateDOM, elementsList } from './updateDOM';

let todoList = ['Plan a day', 'Make a coffee'],
  inprogressList = ['Do workout', 'Listen to music'],
  doneList = ['Check LinkedIn messages', 'Read emails'],
  itemsList = null;
const listArrays = ['todo', 'inprogress', 'done'];

function getLocalItems() {
  if (localStorage.getItem('todoItems')) {
    todoList = JSON.parse(localStorage.todoItems);
    inprogressList = JSON.parse(localStorage.inprogressItems);
    doneList = JSON.parse(localStorage.doneItems);
    itemsList = [todoList, inprogressList, doneList];
  } else {
    itemsList = [todoList, inprogressList, doneList];
    setLocalItems(listArrays, itemsList);
  }
}
function setLocalItems(columns, items) {
  columns.forEach((column, index) => {
    localStorage.setItem(`${column}Items`, JSON.stringify(items[index]));
  });
}

function updateLists() {
  elementsList.forEach((element, index) => {
    itemsList[index] = [];
    for (let i = 0; i < element.children.length; i++) {
      itemsList[index].push(element.children[i].textContent);
    }
  });
  updateDOM();
}

export { getLocalItems, setLocalItems, updateLists, listArrays, itemsList };
