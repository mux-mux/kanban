let todoList = [];
let inprogressList = [];
let doneList = [];
let listArrays = [];

function getSavedColumns() {
  if (localStorage.getItem('todoItems')) {
    todoList = JSON.parse(localStorage.todoItems);
    inprogressList = JSON.parse(localStorage.inprogressItems);
    doneList = JSON.parse(localStorage.doneItems);
  } else {
    todoList = ['Plan a day', 'Make a coffee'];
    inprogressList = ['Do workout', 'Listen to music'];
    doneList = ['Check LinkedIn messages', 'Read emails'];
  }
}
function setSavedColumns() {
  listArrays = [todoList, inprogressList, doneList];
  const arrayNames = ['todo', 'inprogress', 'done'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  });
}

export { getSavedColumns, setSavedColumns };
