class Project {
  constructor(name) {
    this.name = name;
    this.taskList = [];
  }

  addTask(task) {
    this.taskList.push(task);
  }

  delTask(index) {
    this.taskList.splice(index, 1);
  }

  getName() {
    return this.name;
  }

  getTaskList() {
    return this.taskList;
  }
}

export { Project };
