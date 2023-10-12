import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { updateDOM } from '../update/updateDOM';
import { interval } from '../set/pomodoro';
import { undoItem } from './undoItem';

const overallRemoved = [];

function deleteItem(columnNum, itemNum) {
  const pomodoroContainer = document.getElementById('pomodoro');
  const pomodoroContainerClone = pomodoroContainer.cloneNode(true);

  pomodoroContainer.parentNode.replaceChild(pomodoroContainerClone, pomodoroContainer);

  const selectedList = localLoaded[columnNames[columnNum]];
  const currRemoved = selectedList.items.splice(itemNum, 1);
  overallRemoved.push(`${JSON.stringify(currRemoved)}, ${columnNum}`);
  clearInterval(interval);

  updateDOM();
}

export { deleteItem, overallRemoved };
