import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

// Firebase database -> Create a project, then create real time database
const appSettings = {
  databaseURL: "" //DATABASE URL
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const ListInDB = ref(database, "Todo List");
const trueList = document.getElementById("shopping-list");
// Event

addButtonEl.addEventListener("click", function () {
  push(ListInDB, inputFieldEl.value); //push this value to database
  inputFieldEl.value = "";
  // changeListAndClearInput(inputFieldEl.value);
});

// gives updated database whenever there is an update
onValue(ListInDB, (snapshot) => {
  
  if(snapshot.exists()){
    // console.log(Object.keys(snapshot));
  
      trueList.innerHTML = "";

      let todoList = Object.entries(snapshot.val()); //changes object to an array whcih will hold all the todo list
      
      // todoList.forEach((element) => {
      //   trueList.innerHTML += `<li> ${element} </li>`;
      // });
    for(let i = 0; i < todoList.length; i++){
      let currentItem = todoList[i];
      // having both ID and Value
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
      // trueList.innerHTML += `<li> ${currentItemValue} </li>`;
      let newEl = document.createElement("li")
      newEl.textContent = currentItemValue;
      newEl.addEventListener('dblclick', () => {
        let exactLocationOfItemInDB = ref(database, `Todo List/${currentItemID}`)
        remove(exactLocationOfItemInDB)
      })
      trueList.append(newEl);
    }
  }else{
    trueList.innerHTML = "<h1>No list</h1>"
  }
  
});
let changeListAndClearInput = (list) => {
  trueList.innerHTML += `<li> ${list} </li>`;
  inputFieldEl.value = "";
};
