import { createElementWithClass } from '../set/createItem';
import { updateDOM, localLoaded, archiveLoaded } from '../update/updateDOM';
import { archive } from '../data/archive';

function archiveItem() {
  const archiveBtn = document.querySelector('.tools-archive');
  const moveToArchiveBtn = document.querySelector('.move-to-archive');
  const archiveContainer = document.querySelector('.archive');
  const archiveClose = document.querySelector('.archive__close');
  const archiveClear = document.querySelector('.archive__clear');

  archiveBtn.addEventListener('click', toggleArchiveVisibility);
  archiveClose.addEventListener('click', removeArchiveVisibility);
  moveToArchiveBtn.addEventListener('click', moveToArchive);
  archiveClear.addEventListener('click', clearArchiveTasks);
  document.addEventListener('click', closeArchive);

  function closeArchive(e) {
    let clickInside = archiveContainer.contains(e.target) || archiveBtn.contains(e.target);

    if (!clickInside) {
      removeArchiveVisibility();
    }
  }

  function removeArchiveVisibility() {
    archiveContainer.classList.remove('archive__visible');
  }

  function toggleArchiveVisibility() {
    archiveContainer.classList.toggle('archive__visible');

    const timerId = setTimeout(() => {
      archiveContainer.classList.contains('archive__visible')
        ? archiveClose.focus()
        : archiveClose.blur();
      clearTimeout(timerId);
    }, 100);
  }

  function clearArchiveTasks() {
    const isConfirm = confirm('Do you really want to clear all archive tasks?');
    if (!isConfirm) return;

    archiveLoaded.length = 0;
    archive.items = [];

    updateDOM();
    renderArchive(archiveLoaded);
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
  const archiveElements = document.querySelectorAll('.archive__item');

  archiveItems.length === 0 &&
    archiveElements.length !== 0 &&
    archiveElements.forEach((item) => item.remove());

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
