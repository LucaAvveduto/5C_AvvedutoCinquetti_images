import { generateNavbar } from "./scripts/navbarComponent.js";
import { generateNavigator } from "./scripts/navigatorComponent.js";
import { generateForm } from "./scripts/formComponent.js";
import { generatePubSub } from "./scripts/pubSubComponent.js";
import { generateLoginComponent } from "./scripts/loginComponent.js";
import { generateCarouselComponent } from "./scripts/carouselComponent.js";
import { generateFetchComponent } from "./scripts/fetchComponent.js"

const pages = document.querySelector("#pages");
const navbarContainer = document.querySelector("#nav-container");
const modalBody = document.getElementById("modalBody");
const loginContainer = document.getElementById("loginContainer");
const modalForm = document.getElementById("modalForm");
const carouselContainer = document.getElementById("carousel");
const spinner = document.getElementById("spinner-container");

const login = generateLoginComponent(loginContainer);
const pubSub = generatePubSub();
const form = generateForm(modalBody,pubSub);
const navigator = generateNavigator(pages);
const navComponent = generateNavbar(navbarContainer);
const modal = new bootstrap.Modal(modalForm);
const carouselComponent = generateCarouselComponent(carouselContainer,pubSub);
const fetchComponent = generateFetchComponent();


const response = await fetch("../src/conf.json");
const conf = await response.json();

spinner.classList.remove("d-none")
const data = await fetchComponent.getImages();
spinner.classList.add("d-none");

modal.show();
form.render();
carouselComponent.build(data);
carouselComponent.render();

pubSub.subscribe("form-submit", async(file) => {
    carouselContainer.classList.add("d-none");
    spinner.classList.remove("d-none");
    await fetchComponent.uploadImage(file);
    const data = await fetchComponent.getImages();
    pubSub.publish("new-image",data);
    spinner.classList.add("d-none");
    carouselContainer.classList.remove("d-none");
});

navComponent.build(["home","admin"]);
navComponent.render();

login.build(conf,"private");
login.renderForm();