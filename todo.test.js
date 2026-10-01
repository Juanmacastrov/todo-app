const test = require('node:test');
const assert = require('node:assert/strict');
const { getPendingCount } = require('./todo-utils.js');

test('counts only not-done tasks as pending', () => {
  const tasks = [
    { id: 1, text: 'A', done: false },
    { id: 2, text: 'B', done: true },
    { id: 3, text: 'C', done: false },
    { id: 4, text: 'D', done: false },
  ];

  assert.equal(getPendingCount(tasks), 3);
});
