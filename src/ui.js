import { Task } from "./task";
import { Project } from "./project";
import { storeData, loadData } from "./storage";

class Ui {
  constructor() {
    this.project_list = [];
    this.current_project = 0;

    if (localStorage.getItem("projects")) {
      this.project_list = loadData();
    } else {
      this.addProject("Default");
    }

    if (this.project_list.length > 0) {
      this.showProjects();
      this.showTasks(this.getProject());
    }

    const addButton = document.querySelector("#AddButton");
    addButton.addEventListener("click", this, false);

    const addTaskBtn = document.querySelector("#AddTask");
    addTaskBtn.addEventListener("click", this, false);

    const addProjButton = document.querySelector("#AddProject");
    addProjButton.addEventListener("click", this, false);

    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", this, false);
  }

  saveData() {
    storeData(this.project_list);
  }

  addProject(name) {
    const project = new Project(name);
    this.project_list.push(project);
    this.current_project = this.project_list.length - 1;
    this.showProjects();
    this.saveData();
  }

  getProject() {
    return this.project_list[this.current_project];
  }

  showProjects() {
    const projDisp = document.querySelector("#projects");
    projDisp.innerHTML = "";

    const projList = document.createElement("ul");
    projDisp.appendChild(projList);

    for (var i = 0; i < this.project_list.length; i++) {
      const proj = document.createElement("li");
      const projLink = document.createElement("a");
      projLink.textContent = this.project_list[i].getName();
      projLink.href = "#";
      projLink.className = "ProjLink";
      projLink.dataset.indexNumber = i;
      projLink.addEventListener("click", this, false);
      proj.appendChild(projLink);
      projList.appendChild(proj);
    }
  }

  showTasks() {
    const taskDisp = document.querySelector("#tasks");
    taskDisp.innerHTML = "";

    const projDisp = document.createElement("h1");
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
      const delBtn = document.createElement("a");
      delBtn.textContent = "delete";
      delBtn.className = "material-symbols-outlined";
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
    console.log(
      "Adding name: " +
        newName.value +
        " desc: " +
        newDesc.value +
        " due: " +
        newDue.value +
        " priority: " +
        newPriority.value,
    );
    this.getProject().addTask(
      new Task(newName.value, newDesc.value, newDue.value, newPriority.value),
    );
    newName.value = "";
    newDesc.value = "";
    newDue.value = "";
    newPriority.value = "Normal";
    this.saveData();
  }

  handleEvent(event) {
    console.log("In handle event: " + event.target.id);
    switch (event.target.id) {
      case "AddButton":
        //this.addTask();
        var modal = document.getElementById("taskModal");
        modal.style.display = "block";
        break;
      case "AddTask":
        console.log("Adding task");
        this.addTask();
        var modal = document.getElementById("taskModal");
        modal.style.display = "none";
        console.log("task added");
        break;
      case "DeleteButton":
        console.log("Delete task " + event.target.dataset.indexNumber);
        this.getProject().delTask(event.target.dataset.indexNumber);
        this.saveData();
        break;
      case "AddProject":
        const newProject = document.querySelector("#project-input");
        this.addProject(newProject.value);
        this.saveData();
        break;
      default:
        if (event.target.className === "ProjLink") {
          this.current_project = event.target.dataset.indexNumber;
          this.showTasks();
        } else if (event.target.className === "close") {
          var modal = document.getElementById("taskModal");
          modal.style.display = "none";
        }
    }
    this.showTasks();
  }
}
export { Ui };
