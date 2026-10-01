const test = require('node:test');
const assert = require('node:assert/strict');
const { getPendingCount, getFilteredTasks } = require('./todo-utils.js');

test('counts only not-done tasks as pending', () => {
  const tasks = [
    { id: 1, text: 'A', done: false },
    { id: 2, text: 'B', done: true },
    { id: 3, text: 'C', done: false },
    { id: 4, text: 'D', done: false },
  ];

  assert.equal(getPendingCount(tasks), 3);
});

test('filters tasks without changing the source list', () => {
  const tasks = [
    { id: 1, text: 'Active task', done: false },
    { id: 2, text: 'Completed task', done: true },
  ];

  assert.deepEqual(getFilteredTasks(tasks, 'all'), tasks);
  assert.deepEqual(getFilteredTasks(tasks, 'active'), [tasks[0]]);
  assert.deepEqual(getFilteredTasks(tasks, 'completed'), [tasks[1]]);
  assert.deepEqual(tasks, [
    { id: 1, text: 'Active task', done: false },
    { id: 2, text: 'Completed task', done: true },
  ]);
});
