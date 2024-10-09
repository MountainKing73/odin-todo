import "./styles.css";
import { Task } from "./task";
import { Project } from "./project";
import { Ui } from "./ui";

const project = new Project("Default");

project.addTask(new Task("task1", "description1", "01/01/2025", "normal"));
project.addTask(new Task("task2", "description2", "01/01/2025", "normal"));
project.addTask(new Task("task3", "description3", "01/01/2025", "normal"));

const ui = new Ui(project);
