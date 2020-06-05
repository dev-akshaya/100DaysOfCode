const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
// const taskListItem = document.querySelectorAll('.collection-item');

loadEventListeners();

// all event listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add Task
  form.addEventListener('submit', addTask);
  // Remove Task 
  taskList.addEventListener('click', removeTask);
  // Clear tasks
  clearBtn.addEventListener('click', clearTasks)
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}


// Add Task ---------------------------------------------------
function addTask(e) {

  // li tag 
  const li = document.createElement('li');
  const liValue = document.createTextNode(taskInput.value);
  li.className= 'collection-item';

  // link tag
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';

  // icon 
  const icon = document.createElement('i');
  icon.className = 'fa fa-remove';
  
  link.appendChild(icon);
  li.appendChild(link);
  li.appendChild(liValue);
  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);
  
  taskInput.value = '';

  e.preventDefault();
}

// Remove Task ---------------------------------------------------
function removeTask(e){
  if(e.target.classList.contains('fa-remove')){
    e.target.parentElement.parentElement.remove();
  }

  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Clear Task ---------------------------------------------------
function clearTasks(e){
  // taskList.innerHTML = '';
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

// Filter Tasks ---------------------------------------------------
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Store in Local Storage ------------------------------------------
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get from Local Storage ------------------------------------------
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // li tag 
    const li = document.createElement('li');
    const liValue = document.createTextNode(task);
    li.className= 'collection-item';

    // link tag
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // icon 
    const icon = document.createElement('i');
    icon.className = 'fa fa-remove';
    
    link.appendChild(icon);
    li.appendChild(link);
    li.appendChild(liValue);
    taskList.appendChild(li);
  });
}

// Remove from Local Storage ------------------------------------------
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent == task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear from Local Storage ------------------------------------------
function clearTasksFromLocalStorage(){
  localStorage.clear();
}