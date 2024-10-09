import { Task } from "./task";
import { Project } from "./project";

class Ui {
  constructor(project) {
    this.project = project;
    this.showProject(project);
    this.showTasks(project);

    const addButton = document.querySelector("#AddButton");
    addButton.addEventListener("click", this, false);
  }

  showProject() {
    const projDisp = document.querySelector("#project");
    projDisp.textContent = this.project.getName();
  }

  showTasks() {
    const taskDisp = document.querySelector("#tasks");
    taskDisp.innerHTML = "";
    let taskList = this.project.getTaskList();
    const list = document.createElement("ul");
    taskDisp.appendChild(list);
    taskList.forEach((element) => {
      const task = document.createElement("li");
      task.dataset.indexNumber = element.getId();
      const nameDiv = document.createElement("div");
      nameDiv.textContent = element.getTitle();
      const descDiv = document.createElement("div");
      descDiv.textContent = element.getDescription();
      const dueDiv = document.createElement("div");
      dueDiv.textContent = element.getDueDate();
      const priorityDiv = document.createElement("div");
      priorityDiv.textContent = element.getPriority();
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.id = "DeleteButton";
      delBtn.dataset.indexNumber = element.getId();
      delBtn.addEventListener("click", this, false);
      task.appendChild(nameDiv);
      task.appendChild(descDiv);
      task.appendChild(dueDiv);
      task.appendChild(priorityDiv);
      task.appendChild(delBtn);
      taskDisp.appendChild(task);
    });
  }

  addTask() {
    const newName = document.querySelector("#task-input");
    const newDesc = document.querySelector("#task-description");
    const newDue = document.querySelector("#task-due");
    const newPriority = document.querySelector("#task-priority");
    this.project.addTask(
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
        this.project.delTask(event.target.dataset.indexNumber);
        break;
    }
    this.showTasks();
  }
}
export { Ui };
