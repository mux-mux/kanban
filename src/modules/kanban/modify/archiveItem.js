import { createFocusTrap } from 'focus-trap';

import { createElementWithClass } from '../set/createItem';
import { updateDOM, localLoaded, archiveLoaded } from '../update/updateDOM';
import { archive } from '../data/archive';

function archiveItem() {
  const buttonToggleArchive = document.querySelector('.tool-archive');
  const buttonMoveToArchive = document.querySelector('.move-to-archive');
  const containerArchive = document.querySelector('.archive');
  const buttonCloseArchive = document.querySelector('.archive__close');
  const buttonDownloadArchive = document.querySelector('.archive__download');
  const buttonUploadArchive = document.querySelector('#selectedFile');
  const modalsContainer = document.getElementById('modals');

  buttonToggleArchive.addEventListener('click', toggleArchiveVisibility);
  buttonCloseArchive.addEventListener('click', toggleArchiveVisibility);
  buttonDownloadArchive.addEventListener('click', downloadArchive);
  buttonUploadArchive.addEventListener('change', uploadArchive);
  buttonMoveToArchive.addEventListener('click', () =>
    moveToArchive(localLoaded.done.items, 'done')
  );

  const focusTrap = createFocusTrap(containerArchive, {
    onActivate: () => buttonCloseArchive.focus(),
    onDeactivate: () => {
      buttonCloseArchive.blur();
      containerArchive.classList.remove('archive__visible');
      modalsContainer.classList.remove('modals__overlay');
    },
    allowOutsideClick: () => true,
    clickOutsideDeactivates: () => true,
  });

  function toggleArchiveVisibility() {
    const isOpened = containerArchive.classList.contains('archive__visible');

    if (!isOpened) {
      containerArchive.classList.add('archive__visible');
      modalsContainer.classList.add('modals__overlay');
      focusTrap.activate();
    } else {
      focusTrap.deactivate();
    }
  }

  function downloadArchive() {
    if (archiveLoaded.length === 0) {
      return;
    }

    const dateISO = new Date().toISOString();
    const dateFullTime = dateISO.replace('T', ' ');
    const dateShortTime = dateFullTime.substring(0, dateFullTime.indexOf('.'));

    const archiveData =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(archiveLoaded));
    const anchorNode = document.createElement('a');
    anchorNode.setAttribute('href', archiveData);
    anchorNode.setAttribute('download', dateShortTime + ' Kanban-Archive' + '.json');
    document.body.appendChild(anchorNode);
    anchorNode.click();
    anchorNode.remove();

    clearArchiveTasks();
  }

  function uploadArchive(e) {
    const files = document.getElementById('selectedFile').files;
    if (files.length <= 0) return;

    const readData = new FileReader();
    readData.onload = onReaderLoad;
    readData.readAsText(e.target.files[0]);

    function onReaderLoad(e) {
      if (isJsonString(e.target.result)) {
        const result = JSON.parse(e.target.result);
        moveToArchive(result, 'load');
      }
    }
  }

  function clearArchiveTasks() {
    const isConfirm = confirm('Do you want to clear all archive tasks?');
    if (!isConfirm) return;

    archiveLoaded.length = 0;
    archive.items = [];

    updateDOM();
    renderArchive(archiveLoaded);
  }
}

function moveToArchive(doneTasks, action) {
  const archiveItems = doneTasks;
  archiveLoaded.push(...archiveItems);
  archive.items = archive.items.concat(archiveItems);
  action === 'done' ? (localLoaded.done.items = []) : null;

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

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export { archiveItem, renderArchive };
