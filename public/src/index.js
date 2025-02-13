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

const login = generateLoginComponent(loginContainer);
const pubSub = generatePubSub();
const form = generateForm(modalBody,pubSub);
const navigator = generateNavigator(pages);
const navComponent = generateNavbar(navbarContainer);
const modal = new bootstrap.Modal(modalForm);
const carouselComponent = generateCarouselComponent(carouselContainer);
const fetchComponent = generateFetchComponent();

const response = await fetch("../src/conf.json");
const conf = await response.json();

const data = await fetchComponent.getImages();

carouselComponent.build(data.imgs);
carouselComponent.render();

navComponent.build(["home","admin"]);
navComponent.render();

login.build(conf,"private");
login.renderForm();