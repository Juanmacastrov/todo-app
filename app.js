const STORAGE_KEY = 'tasks';
const form = document.getElementById('add-form');
const input = document.getElementById('new-task');
const list = document.getElementById('task-list');
const counter = document.getElementById('counter');

let tasks = load();

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

function render() {
  list.innerHTML = '';
  for (const task of tasks) {
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

  const remaining = tasks.filter(t => !t.done).length;
  counter.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'} left`;
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

render();
