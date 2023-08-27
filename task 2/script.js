document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", addTask);

    // Load tasks from local storage when the page loads
    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteBtn">Delete</button>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = "";
        saveTasksToLocalStorage();

        const deleteBtn = taskItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            saveTasksToLocalStorage();
        });
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(taskText => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <button class="deleteBtn">Delete</button>
            `;
            taskList.appendChild(taskItem);

            const deleteBtn = taskItem.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", () => {
                taskList.removeChild(taskItem);
                saveTasksToLocalStorage();
            });
        });
    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(taskList.querySelectorAll("li span")).map(span => span.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
