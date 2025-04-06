let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" onchange="toggleTask(${index})" ${task.completed ? "checked" : ""}>
        <label class="form-check-label task-text">${task.text}</label>
      </div>
      <div class="btn-group btn-group-sm" role="group">
        <button class="btn btn-outline-primary" onclick="editTask(${index})">Edit</button>
        <button class="btn btn-outline-danger" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("task-input");
  const value = input.value.trim();
  if (value !== "") {
    tasks.push({ text: value, completed: false });
    input.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit the task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
