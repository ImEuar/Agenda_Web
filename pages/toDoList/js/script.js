const list = document.getElementById('list');

function newTask(){
    // checkBox
    const checkBoxUl = document.createElement('ul');
    const priority = document.getElementById("priority").value;
    checkBoxUl.setAttribute('class', 'list-group list-group-horizontal rounded-0 bg-transparent');
    const taskInput = document.getElementById('taskInput').value;
    const taskInputTest = document.getElementById('taskInput');
    if(taskInput.length >= 1){
        checkBoxUl.setAttribute('id', `${taskInput + 'ul'}`);
        checkBoxUl.innerHTML = `
            <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                <div class="form-check">
                <input class="form-check-input me-0" type="checkbox"/>
                </div>
            </li>
            <li class="list-group-item px-2 py-1 flex-grow-1 border-0 bg-transparent">
            <p class="lead fw-normal mb-0 text-white" id="${taskInput}">` + taskInput + `</p>
            </li>
            <div class="d-flex">
            <a href="#!" class="edit" onclick="editTask('${taskInput}')" id="${taskInput + 'a'}">
                <img src="../../images/edit.png" alt="" width="30px">
            </a>
            <a href="#!" onclick="deleteTask('${taskInput}')" class="delete" id="${taskInput + 'd'}" >
                <img src="../../images/delete.png" alt="" width="30px">
            </a>
            </div>`;
        checkBoxUl.setAttribute("data-priority", priority);
        list.appendChild(checkBoxUl);
        taskInputTest.value = "";
        sortTasks();
    }
};

function sortTasks() {
    let tasks = [...document.getElementById("list").getElementsByTagName("ul")];
    tasks.sort((a, b) => b.getAttribute("data-priority") - a.getAttribute("data-priority"));
    let list = document.getElementById("list");
    list.innerHTML = "";
    tasks.forEach(task => list.appendChild(task));
}

function editTask(text) {
    const save = document.getElementById('save');
    const taskInput = document.getElementById('taskInput');
    taskInput.value = text;
    taskInput.setAttribute('placeholder', 'Editar Tarea');
    save.setAttribute('onclick', `saveTask('${text}')`);
    save.textContent = 'Actualizar';
}
function saveTask(text){
    const taskP = document.getElementById(text);
    const taskA = document.getElementById(text + 'a');
    const taskD = document.getElementById(text + 'd');
    const save = document.getElementById('save');
    const taskInput = document.getElementById('taskInput');
    const priority = document.getElementById("priority").value;
    const taskInputValue = document.getElementById('taskInput').value;
    const taskUl = document.getElementById(text + 'ul');
    if(taskInputValue.length > 0){
        taskP.textContent = taskInputValue;
        taskP.setAttribute('id', taskInputValue);
        taskA.setAttribute('onclick', `editTask('${taskInputValue}')`);
        taskA.setAttribute('id', `${taskInputValue + 'a'}`);
        taskD.setAttribute('onclick', `deleteTask('${taskInputValue}')`);
        taskD.setAttribute('id', `${taskInputValue + 'd'}`);
        taskUl.setAttribute('id', `${taskInputValue + 'ul'}`)

        save.setAttribute('onclick', 'newTask()');
        taskUl.setAttribute("data-priority", priority);
        save.textContent = 'Agregar';
        taskInput.value = "";
        taskInput.setAttribute('placeholder', 'Nueva Tarea');
        sortTasks();
    }else{
        swal({
            text: "¡Debes escribir algo!",
            icon: "../../../images/info.png",
            button: {text: "De acuerdo"},
            className: "aviso",
            closeOnEsc: true
        })
    }
}

function deleteTask(text){
    const taskUl = document.getElementById(text + 'ul');
    taskUl.remove();
}