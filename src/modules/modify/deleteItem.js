import { localLoaded } from '../update/updateDOM';
import { columnNames } from '../data/columns';
import { updateDOM } from '../update/updateDOM';
import { pomodoroIntervalTick } from '../set/pomodoro';
import { removePomodoroTimerListiners } from '../set/pomodoro';

const overallRemoved = [];

function deleteItem(columnNum, itemNum) {
  removePomodoroTimerListiners();

  const selectedList = localLoaded[columnNames[columnNum]];
  const currRemoved = selectedList.items.splice(itemNum, 1);
  overallRemoved.push(`${JSON.stringify(currRemoved)}, ${columnNum}`);
  clearInterval(pomodoroIntervalTick);

  updateDOM();
}

export { deleteItem, overallRemoved };
