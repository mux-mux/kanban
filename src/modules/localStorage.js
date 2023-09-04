let todoList = ['Plan a day', 'Make a coffee'],
  inprogressList = ['Do workout', 'Listen to music'],
  doneList = ['Check LinkedIn messages', 'Read emails'],
  listArrays = ['todo', 'inprogress', 'done'];

function getLocalItems() {
  if (localStorage.getItem('todoItems')) {
    todoList = JSON.parse(localStorage.todoItems);
    inprogressList = JSON.parse(localStorage.inprogressItems);
    doneList = JSON.parse(localStorage.doneItems);
  } else {
    setLocalItems(listArrays, [todoList, inprogressList, doneList]);
  }
}
function setLocalItems(columns, items) {
  columns.forEach((column, index) => {
    localStorage.setItem(`${column}Items`, JSON.stringify(items[index]));
  });
}

export { getLocalItems, setLocalItems };
