import { createFocusTrap } from 'focus-trap';

import { createElementWithClass } from '../set/createItem';
import { updateDOM, localLoaded, archiveLoaded } from '../update/updateDOM';
import { archive } from '../data/archive';

function archiveItem() {
  const buttonToggleArchive = document.querySelector('.tools-archive');
  const buttonMoveToArchive = document.querySelector('.move-to-archive');
  const containerArchive = document.querySelector('.archive');
  const buttonCloseArchive = document.querySelector('.archive__close');
  const buttonDownloadArchive = document.querySelector('.archive__download');
  const buttonUploadArchive = document.querySelector('#selectedFile');

  buttonToggleArchive.addEventListener('click', toggleArchiveVisibility);
  buttonCloseArchive.addEventListener('click', toggleArchiveVisibility);
  buttonDownloadArchive.addEventListener('click', downloadArchive);
  buttonUploadArchive.addEventListener('change', uploadArchive);
  buttonMoveToArchive.addEventListener('click', moveToArchive);

  const focusTrap = createFocusTrap(containerArchive, {
    onActivate: () => buttonCloseArchive.focus(),
    onDeactivate: () => {
      containerArchive.classList.remove('archive__visible');
      buttonCloseArchive.blur();
    },
    allowOutsideClick: () => true,
    clickOutsideDeactivates: () => true,
  });

  function toggleArchiveVisibility() {
    const isOpened = containerArchive.classList.contains('archive__visible');

    if (!isOpened) {
      containerArchive.classList.add('archive__visible');
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

  function uploadArchive() {
    const files = document.getElementById('selectedFile').files;

    if (files.length <= 0) return;

    const readData = new FileReader();

    readData.onload = function (e) {
      const result = JSON.parse(e.target.result);
    };
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
