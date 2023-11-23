import { createElementWithClass } from '../set/createItem';
import { updateDOM, localLoaded, archiveLoaded } from '../update/updateDOM';
import { archive } from '../data/archive';

function archiveItem() {
  const archiveBtn = document.querySelector('.tools-archive');
  const moveToArchiveBtn = document.querySelector('.move-to-archive');
  const archiveContainer = document.querySelector('.archive');
  const archiveClose = document.querySelector('.archive__close');
  const columnsContainer = document.querySelector('.drag');

  archiveBtn.addEventListener('click', toggleArchiveVisibility);
  archiveClose.addEventListener('click', removeArchiveVisibility);
  moveToArchiveBtn.addEventListener('click', moveToArchive);

  columnsContainer.addEventListener('click', (e) => {
    if (!e.target.closest('.archive') && !e.target.matches('.tools-archive')) {
      if (archiveContainer.classList.contains('archive__visible')) {
        removeArchiveVisibility();
      }
    }
  });

  function removeArchiveVisibility() {
    archiveContainer.classList.remove('archive__visible');
  }

  function toggleArchiveVisibility() {
    archiveContainer.classList.toggle('archive__visible');
  }
}

function moveToArchive() {
  const archiveItems = localLoaded.done.items;
  archiveLoaded.push(...archiveItems);
  archive.items = archive.items.concat(archiveItems);
  localLoaded.done.items = [];

  updateDOM();
  renderArchive(archiveItems);
}

function renderArchive(archiveItems) {
  const archiveTable = document.querySelector('.archive__body');

  archiveItems.forEach((item) => {
    if (item.deadline.includes('day') === false) {
      let prependText;
      const newDeadline = +item.deadline.replaceAll('-', '') - +item.add.replaceAll('-', '');
      if (newDeadline > 1) {
        prependText = ' days';
      } else if (newDeadline === 1) {
        prependText = ' day';
      }
      item.deadline = newDeadline === 0 ? 'today' : newDeadline + ' ' + prependText;
    }

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
