const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
const searchBox = document.getElementById("search-box");

// Add Task
function addtask() {
  const text = inputbox.value.trim();
  if (text === '') {
    alert("Must write something");
    return;
  }
  createTaskElement(text);
  savedata();
  inputbox.value = '';
}

// Create Task Element
function createTaskElement(text) {
  let li = document.createElement("li");
  li.dataset.text = text.toLowerCase();
  li.textContent = text;

  // Edit Button
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "editBtn";
  editBtn.onclick = function () {
    const newText = prompt("Edit task:", li.firstChild.textContent);
    if (newText !== null && newText.trim() !== "") {
      li.firstChild.textContent = newText;
      li.dataset.text = newText.toLowerCase();
      savedata();
    }
  };

  // Delete Button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteBtn";
  deleteBtn.onclick = function () {
    li.remove();
    savedata();
  };

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  listcontainer.appendChild(li);
}

// Save data
function savedata() {
  const tasks = [];
  const items = listcontainer.querySelectorAll("li");
  items.forEach(li => {
    tasks.push(li.firstChild.textContent.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load data
function showtask() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  listcontainer.innerHTML = "";
  savedTasks.forEach(task => createTaskElement(task));
}

// Search / Filter Tasks
searchBox.addEventListener("input", function () {
  const filter = searchBox.value.toLowerCase();
  const items = listcontainer.querySelectorAll("li");
  items.forEach(li => {
    if (li.dataset.text.includes(filter)) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
});

// Load tasks on page load
showtask();

// Logout button clears sessionStorage
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", function () {
  sessionStorage.clear();
  window.location.href = "login.html";
});
 