const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".page-section");

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;

        sections.forEach(sec => sec.classList.add("hidden"));
        document.getElementById(target).classList.remove("hidden");
    });
});

// "Get Started" button → Go to Tasks section
document.getElementById("startBtn").addEventListener("click", () => {
    sections.forEach(sec => sec.classList.add("hidden"));
    document.getElementById("tasks").classList.remove("hidden");
});


let tasks = [];
let taskId = 1;

document.getElementById("addTask").addEventListener("click", () => {
    const text = document.getElementById("taskText").value;

    if (text === "") return alert("Enter a task");

    const newTask = {
        id: taskId++,
        text: text,
        done: false
    };

    tasks.push(newTask);
    displayTasks();
});


function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("task-card");
        card.classList.add(task.done ? "done" : "not-done");

        card.innerHTML = `
            <p><b>ID:</b> ${task.id}</p>
            <p>${task.text}</p>
            <button onclick="toggleDone(${task.id})">Toggle Done</button>
        `;

        list.appendChild(card);
    });

    updateCompletedCount();
}

function toggleDone(id) {
    const task = tasks.find(t => t.id === id);
    task.done = !task.done;
    displayTasks();
}

document.getElementById("updateProfile").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    document.getElementById("profileName").textContent = "Name: " + name;
    document.getElementById("profileEmail").textContent = "Email: " + email;

    updateCompletedCount();
});

function updateCompletedCount() {
    const completed = tasks.filter(t => t.done).length;
    document.getElementById("profileCompleted").textContent =
        "Completed Tasks: " + completed;
}


