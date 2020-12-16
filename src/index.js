import Time from "./time";
// import Skycons from './skycons.js';
import Weather from "./widgets/weather";
import { currancyWidget } from "./widgets/currancy";
import Todo from "./widgets/todo";
import PassGenerator from "./widgets/passGenerator";
import UserInfo from "./widgets/getUserInfo";
import Settings from "./utils/settings";
import {
  change_Vidget_Position,
  showBlock,
  logoutAndDeleteLocalStorage,
} from "./utils/functions";

//Main functions
function eventListeners() {
  //*** USER INFO ***
  const $name = document.querySelector("#name");
  const $focus = document.querySelector("#focus");

  const user_info = new UserInfo($name, $focus);

  user_info.getName();
  user_info.getFocus();

  $name.addEventListener("keypress", user_info.setName);
  $name.addEventListener("blur", user_info.setName);
  $focus.addEventListener("keypress", user_info.setFocus);
  $focus.addEventListener("blur", user_info.setFocus);

  // *** TIME ***
  const $time = document.querySelector("#time");

  const time_show = new Time($time);
  time_show.showTime();

  // *** WEATHER ***
  const $todo_show = document.querySelector("#btnToDo");
  const $todo_block = document.querySelector(".todo-app");
  $todo_show.addEventListener("click", () => showBlock($todo_block));

  const $temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const $temperatureDegree = document.querySelector(".temperature-degree");
  const $locationTimezone = document.querySelector(".location-timezone");

  const weather = new Weather(
    $temperatureDescription,
    $temperatureDegree,
    $locationTimezone
  );
  weather.displayWeather();

  // *** TODO ***
  const $todoInput = document.querySelector("#myInput");
  const $todoAddButton = document.querySelector(".addBtn");
  const $todoUl = document.querySelector("#myUL");

  // const todo_addTodoBtn = document.querySelector('.addBtn');

  //adding todo
  const todo = new Todo($todoInput, $todoAddButton, $todoUl);
  $todoInput.addEventListener("keypress", (keyPress) => {
    const keyEnter = 13;
    if (keyPress.which === keyEnter) {
      todo.createTodo();
    }
  });
  // todo_addTodoBtn.addEventListener('click', todo.createTodo());

  //check todo
  $todoUl.addEventListener("click", (e) => {
    todo.onClickTodo(e, $todoUl);
  });

  //loading todo
  todo.loadTodo();

  // *** SETTINGS ***
  const $settings_show = document.querySelector(".setting_img");
  const $settings_block = document.querySelector("#tabs");

  $settings_show.addEventListener("click", () => showBlock($settings_block));

  const settings = new Settings($settings_block);
  settings.createTabs();

  // *** WIDGET ***

  //CURRENCY

  let $currency_show = document.querySelector(".switch_1");
  const $currency_block = document.querySelector(".exchange-rates");

  $currency_show.addEventListener("click", () =>
    showBlock($currency_block, "currency_block")
  );

  //check if block in localStorage
  if (localStorage.getItem("currency_block_check") === "on") {
    $currency_block.style.display = "block";
    $currency_show.checked = !0;
  }

  //get block position from localStorage
  if (localStorage.getItem("position_currency_block_top")) {
    $currency_block.style.top = localStorage.getItem(
      "position_currency_block_top"
    );
    console.log($currency_block.style.top);
  }

  if (localStorage.getItem("position_currency_block_left")) {
    $currency_block.style.left = localStorage.getItem(
      "position_currency_block_left"
    );
    console.log($currency_block.style.left);
  }

  //change block position
  $currency_block.addEventListener("mousedown", (e) =>
    change_Vidget_Position(e, $currency_block, "currency_block")
  );

  currancyWidget($currency_block);

  //PASS GENERATOR

  const $passGenerator_show = document.querySelector("#pass-generator-show");
  const $passGenerator_block = document.querySelector(".pass-generator");

  $passGenerator_show.addEventListener("click", () =>
    showBlock($passGenerator_block, "passGenerator_block")
  );

  //Show password length
  const $passGenerator_InputValue = document.querySelector("#param-1");
  $passGenerator_InputValue.oninput = () => {
    document.querySelector("#password-length").innerHTML =
      $passGenerator_InputValue.value;
  };

  //check if block in localStorage
  if (localStorage.getItem("passGenerator_block_check") === "on") {
    $passGenerator_block.style.display = "block";
    $passGenerator_show.checked = !0;
  }

  //get block position from localStorage
  if (localStorage.getItem("position_passGenerator_block_top")) {
    $passGenerator_block.style.top = localStorage.getItem(
      "position_passGenerator_block_top"
    );
  }

  if (localStorage.getItem("position_passGenerator_block_left")) {
    $passGenerator_block.style.left = localStorage.getItem(
      "position_passGenerator_block_left"
    );
  }

  //change block position
  $passGenerator_block.addEventListener("dblclick", (e) =>
    change_Vidget_Position(e, $passGenerator_block, "passGenerator_block")
  );

  const passGenerator = new PassGenerator();
  const $passGenerator_generateBtb = document.querySelector("#generator");

  $passGenerator_generateBtb.addEventListener("click", () => {
    passGenerator.generatePass();
  });

  //LOGOUT
  const $logout_btn = document.querySelector(".delete_local_storage");
  $logout_btn.addEventListener("click", logoutAndDeleteLocalStorage);
}

//STARTING Main function
document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});
