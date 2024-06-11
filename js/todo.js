const boxInput = document.getElementById('box-input');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const addNewTaskBtn = document.getElementById('add-new-task-btn');
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn');
const confirmCloseBoxDialog = document.getElementById('confirm-close-box-dialog');
const closeBoxInputBtn = document.getElementById('close-box-input-btn');
const cancelBtn = document.getElementById('cancel-btn');
const discardBtn = document.getElementById('discard-btn');
const tasksContainer = document.getElementById('tasks-container');

const dataOfTask = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const addOrUpdateTask = () => {
    const arrIndex = dataOfTask.findIndex((item) => item.id === currentTask.id);
    const taskObj = {
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
    };

    if (arrIndex === -1) {
        dataOfTask.unshift(taskObj);
    } else {
        dataOfTask[arrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(dataOfTask));

    updateTaskContainer();
    reset();
};

const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";

    dataOfTask.forEach(({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Description:</strong> ${description}</p>
                <button onclick="editTask(this)" type="button" class="btn">Edit</button>
                <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
            </div>
            `)
    });
};

const deleteTask = (buttonElement) => {
    const arrIndex = dataOfTask.findIndex((item) =>
        item.id === buttonElement.parentElement.id
    );

    buttonElement.parentElement.remove();
    dataOfTask.splice(arrIndex, 1);
    localStorage.setItem("data", JSON.stringify(dataOfTask));
};

const editTask = (buttonElement) => {
    const arrIndex = dataOfTask.findIndex((item) =>
        item.id === buttonElement.parentElement.id
    );

    currentTask = dataOfTask[arrIndex];

    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;
    addOrUpdateTaskBtn.innerHTML = "Update Task";

    boxInput.classList.toggle("hidden");
};

const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    boxInput.classList.toggle("hidden");
    currentTask = {};
};

if (dataOfTask.length) {
    updateTaskContainer();
}

addNewTaskBtn.addEventListener("click", () => {
    boxInput.classList.toggle("hidden");
});

closeBoxInputBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    const formInputsValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

    if (formInputsContainValues && formInputsValuesUpdated) {
        confirmCloseBoxDialog.showModal();
    } else {
        reset();
    }
});

cancelBtn.addEventListener("click", () => confirmCloseBoxDialog.close());

discardBtn.addEventListener("click", () => {
    confirmCloseBoxDialog.close();
    reset();
});

boxInput.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateTask();
});