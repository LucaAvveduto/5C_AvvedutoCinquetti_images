import { generateNavbar } from "./scripts/navbarComponent.js";
import { generateNavigator } from "./scripts/navigatorComponent.js";
import { generateForm } from "./scripts/formComponent.js";
import { generatePubSub } from "./scripts/pubSubComponent.js";
import { generateLoginComponent } from "./scripts/loginComponent.js";

const pages = document.querySelector("#pages");
const navbarContainer = document.querySelector("#nav-container");
const modalBody = document.getElementById("modalBody")
const login = generateLoginComponent(document.getElementById("loginContainer"));
login.build();
const pubSub = generatePubSub();
const form = generateForm(modalBody,pubSub);
const navigator = generateNavigator(pages);
const navComponent = generateNavbar(navbarContainer);
const modal = new bootstrap.Modal(document.getElementById("modalForm"));


const response = await fetch("../src/conf.json");
const conf = await response.json();

navComponent.build(["home","admin"]);
navComponent.render();
login.build(conf,"private");
login.renderForm();

modal.show();
form.render();