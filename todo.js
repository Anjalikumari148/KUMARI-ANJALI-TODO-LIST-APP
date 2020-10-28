var Input = document.getElementById("new-task"); //Add a new task.
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); //ul of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks


//New task list item
var createNewTaskElement = function(taskString) {

    var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input"); //checkbx
    //label
    var label = document.createElement("label"); //label
    //input (text)
    var editInput = document.createElement("input"); //text
    //button.edit
    var editButton = document.createElement("button"); //edit button

    //button.delete
    var deleteButton = document.createElement("button"); //delete button

    label.innerText = taskString;


    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";




    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask = function() {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing list.

var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if (containsClass) {


        //label becomes the inputs value.
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }

    //toggle 
    listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask = function() {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the list.
    ul.removeChild(listItem);

}


//Mark task completed in the checkbox
var taskCompleted = function() {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function() {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



var Request = function() {
    console.log("Request");
}


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", Request);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");


    editButton.onclick = editTask;

    deleteButton.onclick = deleteTask;

    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTask list
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasks
for (var i = 0; i < completedTasksHolder.children.length; i++) {

    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}