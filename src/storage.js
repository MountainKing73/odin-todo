import { Project } from "./project";
import { Task } from "./task";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function storeData(projects) {
  if (storageAvailable("localStorage")) {
    localStorage.setItem("projects", JSON.stringify(projects));
  } else {
    console.log("Local storage not available");
  }
}

// Deserialize the local data
function loadData() {
  let project_list = [];
  const projects = JSON.parse(localStorage.getItem("projects"));

  projects.forEach((element) => {
    const project = new Project(element.name);
    element.taskList.forEach((t) => {
      const task = new Task(t.title, t.description, t.dueData, t.priority);
      project.addTask(task);
    });
    project_list.push(project);
  });

  return project_list;
}

export { storeData, loadData };
