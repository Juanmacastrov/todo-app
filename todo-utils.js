function getPendingCount(tasks = []) {
  return tasks.filter(task => !task.done).length;
}

function getFilteredTasks(tasks = [], filter = 'all') {
  if (filter === 'active') return tasks.filter(task => !task.done);
  if (filter === 'completed') return tasks.filter(task => task.done);
  return tasks;
}

if (typeof window !== 'undefined') {
  window.getPendingCount = getPendingCount;
  window.getFilteredTasks = getFilteredTasks;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getPendingCount, getFilteredTasks };
}
