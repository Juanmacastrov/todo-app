function getPendingCount(tasks = []) {
  return tasks.filter(task => !task.done).length;
}

if (typeof window !== 'undefined') {
  window.getPendingCount = getPendingCount;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getPendingCount };
}
