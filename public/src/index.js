import { generateNavbar } from "./scripts/navbarComponent.js";
import { generateNavigator } from "./scripts/navigatorComponent.js";

const pages = document.querySelector("#pages");
const navbarContainer = document.querySelector("#nav-container");

const navigator = generateNavigator(pages);
const navComponent = generateNavbar(navbarContainer);

navComponent.build(["home","admin"]);
navComponent.render();