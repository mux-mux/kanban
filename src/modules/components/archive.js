import { createElementWithClass } from '../helpers/helpers';
import updateDOM from '../update/updateDOM';
import toggleModal from './modal';
import { getLocalData, setLocalData, getLocalItems, setLocalItems } from '../update/localStorage';

function archiveItem() {
  const archiveModal = document.querySelector('.modal-archive');
  const buttonClose = document.querySelector('.btn-close-archive');
  const buttonToggle = document.querySelector('.tool-archive');
  const buttonMoveTo = document.querySelector('.archive-move-to');
  const buttonDownload = document.querySelector('.btn-add-archive');
  const buttonUpload = document.querySelector('#selectedFile');

  toggleModal(archiveModal, buttonClose, buttonToggle);

  buttonDownload.addEventListener('click', downloadArchive);
  buttonUpload.addEventListener('change', uploadArchive);
  buttonMoveTo.addEventListener('click', moveCompletedTasksToArchive);
}

function moveCompletedTasksToArchive() {
  const items = getLocalItems();
  moveToArchive(items.done.items, 'done');
}

function downloadArchive() {
  const archiveLoaded = getLocalData('archiveItems');
  if (archiveLoaded.length === 0) return;

  const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];

  const fileData =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(archiveLoaded, null, 2));

  const link = document.createElement('a');
  link.href = fileData;
  link.download = `${timestamp} Kanban-Archive.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  confirmClearArchive();
}

function uploadArchive(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (isJsonString(e.target.result)) {
      moveToArchive(JSON.parse(e.target.result), 'load');
    }
  };
  reader.readAsText(file);
}

function confirmClearArchive() {
  if (confirm('Do you want to clear all archive tasks?'));
  setLocalData('archiveItems', []);
  updateDOM();
}

function moveToArchive(doneTasks, action) {
  const itemsLoaded = getLocalItems();
  const archiveLoaded = getLocalData('archiveItems');
  const doneColumn = Object.keys(itemsLoaded).length - 1;

  archiveLoaded.push(...doneTasks);
  itemsLoaded[Object.keys(itemsLoaded)[doneColumn]].items = [];

  setLocalData('archiveItems', archiveLoaded);
  action === 'done' && setLocalItems(itemsLoaded);

  updateDOM();
}

function renderArchive(archiveItems) {
  const archiveTable = document.querySelector('.archive__body');
  const existingItems = document.querySelectorAll('.archive__item');

  existingItems.length > 0 && existingItems.forEach((item) => item.remove());

  archiveItems.forEach((item) => {
    const row = createElementWithClass('tr', 'archive__item');
    for (const [key, value] of Object.entries(item)) {
      if (key === 'name' || key === 'add' || key === 'sessions' || key === 'done') {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
        archiveTable.appendChild(row);
      }
    }
  });
}

function isJsonString(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export { archiveItem, renderArchive };
