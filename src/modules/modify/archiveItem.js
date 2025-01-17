import { createElementWithClass } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import toggleModal from './toggleModal';
import {
  getLocalArchive,
  setLocalArchive,
  getLocalItems,
  setLocalItems,
} from '../update/localStorage';

function archiveItem() {
  const containerArchive = document.querySelector('.modal-archive');
  const buttonCloseArchive = document.querySelector('.btn-close-archive');
  const buttonToggleArchive = document.querySelector('.tool-archive');
  const buttonMoveToArchive = document.querySelector('.archive-move-to');
  const buttonDownloadArchive = document.querySelector('.btn-add-archive');
  const buttonUploadArchive = document.querySelector('#selectedFile');

  toggleModal(containerArchive, buttonCloseArchive, buttonToggleArchive);

  buttonDownloadArchive.addEventListener('click', downloadArchive);
  buttonUploadArchive.addEventListener('change', uploadArchive);
  buttonMoveToArchive.addEventListener('click', () => {
    const itemsLoaded = getLocalItems();
    moveToArchive(itemsLoaded.done.items, 'done');
  });

  function downloadArchive() {
    const archiveLoaded = getLocalArchive();
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

    setLocalArchive([]);

    updateDOM();
  }
}

function moveToArchive(doneTasks, action) {
  const itemsLoaded = getLocalItems();
  const archiveLoaded = getLocalArchive();
  const columnDoneNum = Object.keys(itemsLoaded).length - 1;
  const archiveItems = doneTasks;
  archiveLoaded.push(...archiveItems);
  itemsLoaded[Object.keys(itemsLoaded)[columnDoneNum]].items = [];

  setLocalArchive(archiveLoaded);
  action === 'done' ? setLocalItems(itemsLoaded) : null;

  updateDOM();
}

function renderArchive(archiveItems) {
  const archiveTable = document.querySelector('.archive__body');
  const archiveElements = document.querySelectorAll('.archive__item');

  archiveItems.length === 0 &&
    archiveElements.length !== 0 &&
    archiveElements.forEach((item) => item.remove());

  archiveItems.forEach((item) => {
    const archiveRow = createElementWithClass('tr', 'archive__item');
    for (const [key, value] of Object.entries(item)) {
      if (key === 'name' || key === 'add' || key === 'sessions' || key === 'done') {
        const archiveCell = document.createElement('td');
        archiveCell.textContent = value;
        archiveRow.appendChild(archiveCell);
        archiveTable.appendChild(archiveRow);
      }
    }
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
