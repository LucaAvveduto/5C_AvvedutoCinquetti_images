import { generateNavbar } from "./scripts/navbarComponent.js";
import { generateNavigator } from "./scripts/navigatorComponent.js";
import { generateForm } from "./scripts/formComponent.js";
import { generatePubSub } from "./scripts/pubSubComponent.js";

const pages = document.querySelector("#pages");
const navbarContainer = document.querySelector("#nav-container");
const modalBody = document.getElementById("modalBody")

const pubSub = generatePubSub();
const form = generateForm(modalBody,pubSub);
const navigator = generateNavigator(pages);
const navComponent = generateNavbar(navbarContainer);
const modal = new bootstrap.Modal(document.getElementById("modalForm"));

navComponent.build(["home","admin"]);
navComponent.render();

modal.show();
form.render();