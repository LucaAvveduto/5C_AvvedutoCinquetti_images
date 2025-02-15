import { generateNavbar } from "./scripts/navbarComponent.js";
import { generateNavigator } from "./scripts/navigatorComponent.js";
import { generateForm } from "./scripts/formComponent.js";
import { generatePubSub } from "./scripts/pubSubComponent.js";
import { generateLoginComponent } from "./scripts/loginComponent.js";
import { generateCarouselComponent } from "./scripts/carouselComponent.js";
import { generateFetchComponent } from "./scripts/fetchComponent.js";
import { generateAdminTable } from "./scripts/adminTableComponent.js";

const pages = document.querySelector("#pages");
const navbarContainer = document.querySelector("#nav-container");
const modalBody = document.getElementById("modalBody");
const loginContainer = document.getElementById("loginContainer");
const modalForm = document.getElementById("modalForm");
const carouselContainer = document.getElementById("carousel");
const spinner = document.getElementById("spinner-container");
const admTabContainer = document.getElementById("table");

const login = generateLoginComponent(loginContainer);
const pubSub = generatePubSub();
const form = generateForm(modalBody,pubSub);
const navigator = generateNavigator(pages);
const navComponent = generateNavbar(navbarContainer);
const modal = new bootstrap.Modal(modalForm);
const carouselComponent = generateCarouselComponent(carouselContainer,pubSub);
const fetchComponent = generateFetchComponent();
const admTabComponent = generateAdminTable(admTabContainer,pubSub);

const response = await fetch("../src/conf.json");
const conf = await response.json();

spinner.classList.remove("d-none")
const data = await fetchComponent.getImages();
spinner.classList.add("d-none");

form.build();
carouselComponent.build(data);
carouselComponent.render();

admTabComponent.build(data);
admTabComponent.render();

pubSub.subscribe("open-modal", () => modal.show());

pubSub.subscribe("el-to-delete", async(element) => {
    admTabContainer.classList.add("d-none");
    spinner.classList.remove("d-none");
    await fetchComponent.deleteImage(element);
    const data = await fetchComponent.getImages();
    pubSub.publish("img-change",data);
    spinner.classList.add("d-none");
    admTabContainer.classList.remove("d-none");
});

pubSub.subscribe("form-submit", async(file) => {
    admTabContainer.classList.add("d-none");
    spinner.classList.remove("d-none");
    await fetchComponent.uploadImage(file);
    const data = await fetchComponent.getImages();
    pubSub.publish("img-change",data);
    spinner.classList.add("d-none");
    admTabContainer.classList.remove("d-none");
});

navComponent.build(["home","admin"]);
navComponent.render();

login.build(conf,"private");
login.renderForm();