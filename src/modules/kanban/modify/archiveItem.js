import { createElementWithClass } from '../set/createItem';
import { updateDOM, localLoaded } from '../update/updateDOM';
import { archive } from '../data/archive';

function archiveItem() {
  const archiveBtn = document.querySelector('.tools-archive');
  const moveToArchiveBtn = document.querySelector('.move-to-archive');
  const archiveContainer = document.querySelector('.archive__container');

  archiveBtn.addEventListener('click', toggleArchiveVisibility);

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.archive__container') && !e.target.matches('.tools-archive')) {
      if (archiveContainer.classList.contains('archive__visible')) {
        archiveContainer.classList.remove('archive__visible');
      }
    }
  });

  moveToArchiveBtn.addEventListener('click', moveToArchive);

  function toggleArchiveVisibility() {
    archiveContainer.classList.toggle('archive__visible');
  }
}

function moveToArchive() {
  const archiveItems = localLoaded.done.items;
  archive.items = archive.items.concat(archiveItems);
  localLoaded.done.items = [];

  updateDOM();
  renderArchive(archiveItems);
}

function renderArchive(archiveItems) {
  const archiveTable = document.querySelector('.archive');

  archiveItems.forEach((item) => {
    const archiveRow = createElementWithClass('tr', 'archive__item');
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
