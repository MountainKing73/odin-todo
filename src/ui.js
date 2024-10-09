import { Task } from "./task";
import { Project } from "./project";

class Ui {
  constructor() {
    this.project_list = [];
    this.current_project = 0;
    this.addProject("Default");
    this.getProject().addTask(
      new Task("task1", "description1", "01/01/2025", "normal"),
    );
    this.getProject().addTask(
      new Task("task2", "description2", "01/01/2025", "normal"),
    );
    this.getProject().addTask(
      new Task("task3", "description3", "01/01/2025", "normal"),
    );

    this.showTasks(this.getProject());

    const addButton = document.querySelector("#AddButton");
    addButton.addEventListener("click", this, false);

    const addProjButton = document.querySelector("#AddProject");
    addProjButton.addEventListener("click", this, false);

    this.addProject("Project2");
    this.getProject().addTask(
      new Task("task1", "project2 description1", "01/01/2025", "normal"),
    );

    console.log(JSON.stringify(this.project_list));
  }

  addProject(name) {
    const project = new Project(name);
    this.project_list.push(project);
    this.current_project = this.project_list.length - 1;
  }

  getProject() {
    return this.project_list[this.current_project];
  }

  showTasks() {
    const taskDisp = document.querySelector("#tasks");
    taskDisp.innerHTML = "";
    console.log("create project disp");
    const projDisp = document.createElement("h1");
    console.log("projDisp: " + projDisp);
    projDisp.id = "project";
    projDisp.textContent = this.getProject().getName();
    taskDisp.appendChild(projDisp);
    let taskList = this.getProject().getTaskList();
    const list = document.createElement("ul");
    taskDisp.appendChild(list);
    for (var i = 0; i < taskList.length; i++) {
      const task = document.createElement("li");
      task.dataset.indexNumber = i;
      const nameDiv = document.createElement("div");
      nameDiv.textContent = taskList[i].getTitle();
      const descDiv = document.createElement("div");
      descDiv.textContent = taskList[i].getDescription();
      const dueDiv = document.createElement("div");
      dueDiv.textContent = taskList[i].getDueDate();
      const priorityDiv = document.createElement("div");
      priorityDiv.textContent = taskList[i].getPriority();
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.id = "DeleteButton";
      delBtn.dataset.indexNumber = i;
      delBtn.addEventListener("click", this, false);
      task.appendChild(nameDiv);
      task.appendChild(descDiv);
      task.appendChild(dueDiv);
      task.appendChild(priorityDiv);
      task.appendChild(delBtn);
      taskDisp.appendChild(task);
    }
  }

  addTask() {
    const newName = document.querySelector("#task-input");
    const newDesc = document.querySelector("#task-description");
    const newDue = document.querySelector("#task-due");
    const newPriority = document.querySelector("#task-priority");
    this.getProject().addTask(
      new Task(newName.value, newDesc.value, newDue.value, newPriority.value),
    );
    newName.value = "";
    newDesc.value = "";
    newDue.value = "";
    newPriority.value = "Normal";
  }

  handleEvent(event) {
    console.log("In handle event: " + event.target.id);
    switch (event.target.id) {
      case "AddButton":
        this.addTask();
        break;
      case "DeleteButton":
        console.log("Delete task " + event.target.dataset.indexNumber);
        this.getProject().delTask(event.target.dataset.indexNumber);
        break;
      case "AddProject":
        const newProject = document.querySelector("#project-input");
        this.addProject(newProject.value);
    }
    this.showTasks();
  }
}
export { Ui };
