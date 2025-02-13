import { generateNavbar } from "./scripts/navbarComponent.js";
import { generateNavigator } from "./scripts/navigatorComponent.js";
import { generateForm } from "./scripts/formComponent.js";

const pages = document.querySelector("#pages");
const navbarContainer = document.querySelector("#nav-container");
const formContainer = document.getElementById("formContainer")

const modalForm= generateForm(modalForm,null)
const navigator = generateNavigator(pages);
const navComponent = generateNavbar(navbarContainer);

navComponent.build(["home","admin"]);
navComponent.render();

modalForm.render();