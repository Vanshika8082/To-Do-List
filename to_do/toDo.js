let task = document.getElementById("task");
let addButton = document.getElementById("add");
let taskList = document.querySelector(".taskList");
let emptyMsg = document.getElementById("empty-msg");
let clear = document.getElementById("clear");
let print = document.getElementById("print");

addButton.addEventListener("click", () => {
    let string = task.value.trim();
    if (string === "") {
        alert("Enter a task");
        return;
    }

    let newTask = document.createElement("div");
    newTask.classList.add("task");

    let tasktext = document.createElement("span");
    tasktext.innerText = string;
    tasktext.classList.add("task-text");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    checkbox.addEventListener("change", () => {
        tasktext.classList.toggle("completed", checkbox.checked);
        updateProgress();
    });

    let dltButton = document.createElement("button");
    dltButton.innerText = "Delete";
    dltButton.classList.add("dlt-button");

    dltButton.addEventListener("click", () => {
        newTask.remove();
        updateProgress();
        if (taskList.children.length === 1) {
            emptyMsg.style.display = "block";
        }
    });

    newTask.appendChild(checkbox);
    newTask.appendChild(tasktext);
    newTask.appendChild(dltButton);
    taskList.appendChild(newTask);

    emptyMsg.style.display = "none";
    task.value = "";
    updateProgress();
});

clear.addEventListener("click", () => {
    document.querySelectorAll(".task").forEach(task => task.remove());
    emptyMsg.style.display = "block";
    updateProgress();
});

print.addEventListener("click", () => {
    window.print();
});

function updateProgress() {
    let tasks = document.querySelectorAll(".task");
    let completedTasks = document.querySelectorAll(".task-checkbox:checked");
    let progressBar = document.getElementById("progress-bar");
    let progressText = document.getElementById("progress-text");

    if (tasks.length === 0) {
        progressBar.style.width = "0%";
        progressText.innerText = "0% completed";
        return;
    }

    let percentage = Math.round((completedTasks.length / tasks.length) * 100);
    progressBar.style.width = percentage + "%";
    progressText.innerText = `${percentage}% completed`;
}
