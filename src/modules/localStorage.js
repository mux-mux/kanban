import { updateDOM, elementsList } from './updateDOM';

const columns = {
  todo: {
    items: [
      { name: 'Plan a day', deadline: '2023-09-15', pomodoro: false, sessions: 0 },
      { name: 'Make a coffee', deadline: '2023-09-15', pomodoro: false, sessions: 0 },
    ],
  },
  inprogress: {
    items: [
      { name: 'Do workout', deadline: '2023-09-15', pomodoro: false, sessions: 0 },
      { name: 'Listen to music', deadline: '2023-09-15', pomodoro: false, sessions: 0 },
    ],
  },
  done: {
    items: [
      { name: 'Check LinkedIn messages', deadline: '2023-09-15', pomodoro: false, sessions: 0 },
      { name: 'Check emails', deadline: '2023-09-15', pomodoro: false, sessions: 0 },
    ],
  },
};

function getLocalItems(columnNames) {
  if (localStorage.getItem('todoItems')) {
    return columnNames.map((column) => ({ [column]: { items: `${localStorage[column]}Items` } }));
  } else {
    setLocalItems(Object.keys(columns));
  }
}

function setLocalItems(columnNames) {
  columnNames.forEach((column) => {
    localStorage.setItem(`${column}Items`, JSON.stringify(columns[column].items));
  });
  return columns;
}

// function updateLists() {
//   elementsList.forEach((element, index) => {
//     itemsList[index] = Array.from(element.children).map((item) => item.textContent);
//   });
//   updateDOM();
// }

// export { getLocalItems, setLocalItems, updateLists, columns };
export { getLocalItems, setLocalItems, columns };
