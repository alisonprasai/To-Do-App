


let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

let data = JSON.parse(localStorage.getItem("data")) || []; // Get data from local storage

// Event listener for the form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

// Form validation to check if fields are empty
let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// Function to accept data from the input fields and store it in local storage
let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

// Function to create and display tasks
let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>

          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

// Function to reset the input fields after task is added
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// Function to delete a task
let deleteTask = (e) => {
  // Remove the HTML element from the screen
  e.parentElement.parentElement.remove();

  // Remove the targetted task from the data array
  data.splice(e.parentElement.parentElement.id, 1);

  // Update the local storage with the new data
  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
};

// Function to edit a task
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  // Target the values from the selected task and populate the input fields
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  // Run delete function to remove the task from the data, HTML, and local storage
  deleteTask(e);
};

// Immediately invoked function expression (IIFE) to retrieve data from local storage
(() => {
  createTasks(); //call create tasks to display the local storage when the page loads.
})();