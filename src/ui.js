import { Task } from "./task";
import { Project } from "./project";

class Ui {
  constructor(project) {
    this.showProject(project);
    this.showTasks(project);
  }

  showProject(project) {
    const projDisp = document.querySelector("#project");
    projDisp.textContent = project.getName();
  }

  showTasks(project) {
    const taskDisp = document.querySelector("#tasks");
    taskDisp.innerHTML = "";
    let taskList = project.getTaskList();
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
      task.appendChild(nameDiv);
      task.appendChild(descDiv);
      task.appendChild(dueDiv);
      task.appendChild(priorityDiv);
      taskDisp.appendChild(task);
    });
  }

  addTask(project) {
    const newName = document.querySelector("#task-input");
    const newDesc = document.querySelector("#task-description");
    const newDue = document.querySelector("#task-due");
    const newPriority = document.querySelector("#task-priority");
    project.addTask(
      new Task(newName.value, newDesc.value, newDue.value, newPriority.value),
    );
    newName.value = "";
    newDesc.value = "";
    newDue.value = "";
    newPriority.value = "Normal";
    this.showTasks(project);
  }
}
export { Ui };
