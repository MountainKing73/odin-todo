class Project {
  constructor(name) {
    this.taskList = [];
    this.name = name;
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
