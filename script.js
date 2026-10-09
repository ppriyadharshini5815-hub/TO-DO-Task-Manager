var tasks = [
    {
        id: 1,
        text: "Complete SQL assignment",
        completed: false
    },

    {
        id: 2,
        text: "Submit JavaScript project report",
        completed: false
    },

    {
        id: 3,
        text: "Attend Python class",
        completed: false
    },

    {
        id: 4,
        text: "Complete React exercise",
        completed: false
    }
];


var currentFilter = "all";

var updateId = 0;


/* DATE */

var today = new Date();

var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

document.getElementById("day").innerText =
    days[today.getDay()];

document.getElementById("date").innerText =
    today.toLocaleDateString();


/* ADD TASK */

function addTask() {

    var input =
        document.getElementById("taskInput");

    var text = input.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;
    }

    var task = {

        id: Date.now(),

        text: text,

        completed: false
    };

    tasks.push(task);

    input.value = "";

    displayTasks();
}


/* VIEW TASK */

function viewTask(id) {

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            alert(
                "Task Details\n\n" +
                "Task: " + tasks[i].text +
                "\n\nStatus: " +
                (tasks[i].completed
                    ? "Completed"
                    : "Pending")
            );

            return;
        }
    }
}


/* UPDATE TASK */

function updateTask(id) {

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            updateId = id;

            document.getElementById("updateInput").value =
                tasks[i].text;

            document.getElementById("updateBox").style.display =
                "flex";

            return;
        }
    }
}


/* SAVE UPDATE */

function saveUpdate() {

    var newText =
        document.getElementById("updateInput")
        .value.trim();

    if (newText === "") {

        alert("Task cannot be empty.");

        return;
    }


    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id === updateId) {

            tasks[i].text = newText;

            break;
        }
    }


    closeUpdate();

    displayTasks();
}


/* CLOSE UPDATE */

function closeUpdate() {

    document.getElementById("updateBox").style.display =
        "none";
}


/* DELETE TASK */

function deleteTask(id) {

    var answer =
        confirm("Are you sure you want to delete this task?");

    if (!answer) {

        return;
    }


    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            tasks.splice(i, 1);

            break;
        }
    }

    displayTasks();
}


/* MARK AS COMPLETED */

function markCompleted(id) {

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            tasks[i].completed =
                !tasks[i].completed;

            break;
        }
    }

    displayTasks();
}


/* SHOW ALL */

function showAll() {

    currentFilter = "all";

    setActive("all");

    displayTasks();
}


/* SHOW PENDING */

function showPending() {

    currentFilter = "pending";

    setActive("pending");

    displayTasks();
}


/* SHOW COMPLETED */

function showCompleted() {

    currentFilter = "completed";

    setActive("completed");

    displayTasks();
}


/* ACTIVE FILTER */

function setActive(type) {

    document
        .getElementById("allBtn")
        .classList.remove("active");

    document
        .getElementById("pendingBtn")
        .classList.remove("active");

    document
        .getElementById("completedBtn")
        .classList.remove("active");


    if (type === "all") {

        document
            .getElementById("allBtn")
            .classList.add("active");
    }

    if (type === "pending") {

        document
            .getElementById("pendingBtn")
            .classList.add("active");
    }

    if (type === "completed") {

        document
            .getElementById("completedBtn")
            .classList.add("active");
    }
}


/* DISPLAY TASKS */

function displayTasks() {

    var list =
        document.getElementById("taskList");

    list.innerHTML = "";


    for (var i = 0; i < tasks.length; i++) {

        var task = tasks[i];


        if (
            currentFilter === "pending" &&
            task.completed === true
        ) {

            continue;
        }


        if (
            currentFilter === "completed" &&
            task.completed === false
        ) {

            continue;
        }


        var div =
            document.createElement("div");

        div.className = "task";


        if (task.completed) {

            div.classList.add("completed");
        }


        var left =
            document.createElement("div");

        left.className = "task-left";


        var checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked =
            task.completed;


        checkbox.onclick =
            createCompleteFunction(task.id);


        var text =
            document.createElement("span");

        text.className = "task-text";

        text.innerText = task.text;


        left.appendChild(checkbox);

        left.appendChild(text);


        var buttons =
            document.createElement("div");

        buttons.className = "task-buttons";


        var view =
            document.createElement("button");

        view.className = "view-btn";

        view.innerText = "View";

        view.onclick =
            createViewFunction(task.id);


        var update =
            document.createElement("button");

        update.className = "update-btn";

        update.innerText = "Update";

        update.onclick =
            createUpdateFunction(task.id);


        var deleteButton =
            document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.innerText = "Delete";

        deleteButton.onclick =
            createDeleteFunction(task.id);


        buttons.appendChild(view);

        buttons.appendChild(update);

        buttons.appendChild(deleteButton);


        div.appendChild(left);

        div.appendChild(buttons);


        list.appendChild(div);
    }


    updateStatistics();
}


/* BUTTON FUNCTIONS */

function createCompleteFunction(id) {

    return function() {

        markCompleted(id);

    };
}


function createViewFunction(id) {

    return function() {

        viewTask(id);

    };
}


function createUpdateFunction(id) {

    return function() {

        updateTask(id);

    };
}


function createDeleteFunction(id) {

    return function() {

        deleteTask(id);

    };
}


/* STATISTICS */

function updateStatistics() {

    var total = tasks.length;

    var completed = 0;


    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].completed) {

            completed++;
        }
    }


    var pending = total - completed;


    document.getElementById("total").innerText =
        total;

    document.getElementById("pending").innerText =
        pending;

    document.getElementById("completed").innerText =
        completed;


    /* PROGRESS */

    var percent = 0;


    if (total > 0) {

        percent =
            Math.round((completed / total) * 100);
    }


    document.getElementById("percentage").innerText =
        percent + "%";


    document.getElementById("progress").style.width =
        percent + "%";


    if (percent === 100 && total > 0) {

        document.getElementById("progressText").innerText =
            "Excellent! All tasks are completed! 🎉";

    }

    else if (percent >= 50) {

        document.getElementById("progressText").innerText =
            "Great progress! Keep going! 💪";

    }

    else {

        document.getElementById("progressText").innerText =
            "Complete your tasks to increase your progress.";

    }
}


/* ENTER KEY */

document
    .getElementById("taskInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    });


/* START */

displayTasks();