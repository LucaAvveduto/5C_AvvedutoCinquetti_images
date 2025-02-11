import { generateNavbar } from "./scripts/navbarComponent.js";

const navbarContainer = document.querySelector("#nav-container");

const navComponent = generateNavbar(navbarContainer);

navComponent.build(["home","admin"]);
navComponent.render();