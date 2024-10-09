class Project {
  constructor(name) {
    this.taskList = [];
    this.name = name;
  }

  addTask(task) {
    this.taskList.push(task);
  }

  getName() {
    return this.name;
  }

  getTaskList() {
    return this.taskList;
  }
}

export { Project };
