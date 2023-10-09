import { elementWithClass } from '../set/createItem';
import { updateDOM, localLoaded } from '../update/updateDOM';

function archiveItem() {
  const archiveBtn = document.querySelector('.tools-archive');
  const moveToArchiveBtn = document.querySelector('.move-to-archive');
  const archiveContainer = document.querySelector('.archive__container');
  const archive = document.querySelector('.archive');

  archiveBtn.addEventListener('click', toggleArchiveVisibility);
  moveToArchiveBtn.addEventListener('click', moveToArchive);

  function toggleArchiveVisibility() {
    archiveContainer.classList.toggle('archive__visible');
  }

  function moveToArchive() {
    localLoaded.done.items.forEach((item) => {
      const archiveRow = elementWithClass('tr', 'archive__item');
      delete item.break;
      delete item.pomodoro;
      delete item.time;
      for (let key in item) {
        const archiveCell = document.createElement('td');
        archiveCell.textContent = item[key];
        archiveRow.appendChild(archiveCell);
      }
      archive.appendChild(archiveRow);
    });

    localLoaded.done.items = [];

    updateDOM();
  }
}

export { archiveItem };
