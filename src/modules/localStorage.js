let todoList = ['Plan a day', 'Make a coffee'],
  inprogressList = ['Do workout', 'Listen to music'],
  doneList = ['Check LinkedIn messages', 'Read emails'];
const listArrays = ['todo', 'inprogress', 'done'],
  itemsList = [todoList, inprogressList, doneList];

function getLocalItems() {
  if (localStorage.getItem('todoItems')) {
    todoList = JSON.parse(localStorage.todoItems);
    inprogressList = JSON.parse(localStorage.inprogressItems);
    doneList = JSON.parse(localStorage.doneItems);
  } else {
    setLocalItems(listArrays, itemsList);
  }
}
function setLocalItems(columns, items) {
  columns.forEach((column, index) => {
    localStorage.setItem(`${column}Items`, JSON.stringify(items[index]));
  });
}

export { getLocalItems, setLocalItems, itemsList };
