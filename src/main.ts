import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faBars,
  faLocationArrow,
  faGear,
  faWind,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCircleXmark, faMagnifyingGlass, faBars, faLocationArrow, faGear, faWind, faGaugeHigh);

import App from "./App.vue";
const app = createApp(App);

app.use(createPinia()).component("font-awesome-icon", FontAwesomeIcon).mount("weather-widget");
