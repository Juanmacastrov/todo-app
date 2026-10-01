const STORAGE_KEY = 'tasks';
const form = document.getElementById('add-form');
const input = document.getElementById('new-task');
const list = document.getElementById('task-list');
const pendingCounter = document.getElementById('pending-counter');
const clearAllButton = document.getElementById('clear-all');
const filterButtons = document.querySelectorAll('[data-filter]');

let tasks = load();
let activeFilter = 'all';

function getPendingCount(taskList = []) {
  if (!Array.isArray(taskList)) return 0;
  return taskList.filter(task => !task.done).length;
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updatePendingCounter() {
  if (!pendingCounter) return;

  const pending = getPendingCount(tasks);
  const label = pending === 1 ? 'pendiente' : 'pendientes';
  pendingCounter.textContent = `${pending} ${label}`;
  pendingCounter.classList.toggle('zero', pending === 0);
}

function render() {
  list.innerHTML = '';
  clearAllButton.disabled = tasks.length === 0;
  for (const button of filterButtons) {
    button.setAttribute('aria-pressed', button.dataset.filter === activeFilter);
  }

  for (const task of getFilteredTasks(tasks, activeFilter)) {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      save();
      render();
    });

    const text = document.createElement('span');
    text.textContent = task.text;

    const del = document.createElement('button');
    del.className = 'delete';
    del.textContent = '✕';
    del.setAttribute('aria-label', 'Delete task');
    del.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      save();
      render();
    });

    li.append(checkbox, text, del);
    list.append(li);
  }

  updatePendingCounter();
}

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    render();
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, done: false });
  save();
  render();
  input.value = '';
});

clearAllButton.addEventListener('click', () => {
  tasks = [];
  save();
  render();
});

render();
