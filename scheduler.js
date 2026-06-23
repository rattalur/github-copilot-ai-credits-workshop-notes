const tasks = [];
let running = false;

async function addTask(fn, priority = 0) {
  tasks.push({ fn, priority });
  tasks.sort((a, b) => b.priority - a.priority);
  if (!running) await drain();
}

async function drain() {
  running = true;
  while (tasks.length > 0) {
    const task = tasks.shift();
    await task.fn();
  }
  running = false;
}

module.exports = { addTask };
