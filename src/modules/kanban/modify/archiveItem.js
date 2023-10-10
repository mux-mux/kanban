import { elementWithClass } from '../set/createItem';
import { updateDOM, localLoaded, archiveLoaded } from '../update/updateDOM';
import { archive } from '../data/archive';

function archiveItem() {
  const archiveBtn = document.querySelector('.tools-archive');
  const moveToArchiveBtn = document.querySelector('.move-to-archive');
  const archiveContainer = document.querySelector('.archive__container');

  archiveBtn.addEventListener('click', toggleArchiveVisibility);
  moveToArchiveBtn.addEventListener('click', moveToArchive);

  function toggleArchiveVisibility() {
    archiveContainer.classList.toggle('archive__visible');
  }
}

function moveToArchive() {
  archive.items = localLoaded.done.items.length > 0 ? localLoaded.done.items : archiveLoaded;
  localLoaded.done.items = [];

  updateDOM();
  renderArchive();
}

function renderArchive() {
  const archiveTable = document.querySelector('.archive');

  archive.items.forEach((item) => {
    const archiveRow = elementWithClass('tr', 'archive__item');
    delete item.break;
    delete item.pomodoro;
    delete item.time;
    for (let key in item) {
      const archiveCell = document.createElement('td');
      archiveCell.textContent = item[key];
      archiveRow.appendChild(archiveCell);
    }
    archiveTable.appendChild(archiveRow);
  });
}

export { archiveItem, renderArchive };
