const tasks = [

  {
    _id: "5b21ca3eeb7f6fbccd471839",
    name: "Optimize Performance",
    isDone: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471840",
    name: "Design New Feature",
    isDone: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471841",
    name: "Resolve Bug Reports",
    isDone: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471842",
    name: "Plan Team Meeting",
    isDone: false,
  },
];

const getTasks = () => {
  return tasks;
};

const addTask = (task) => {
  let taskInDb = tasks.find((t) => t._id === task._id) || {};
  taskInDb.name = task.name;
  taskInDb.isDone = task.isDone;

  if (!taskInDb._id) {
    taskInDb._id = String(Date.now());
    tasks.push(taskInDb);
  }

  return taskInDb;
};

const deleteTask = (id) => {
  let taskInDb = tasks.find((t) => t._id === id);
  if (taskInDb) {
    tasks.splice(tasks.indexOf(taskInDb), 1);
  }
};

const getTask = (id) => {
  return tasks.find((t) => t._id === id);
};

export { getTasks, addTask, deleteTask, getTask };
