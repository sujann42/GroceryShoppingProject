const form = document.querySelector('#task-form'); //form
const taskList = document.querySelector('.collection'); //ul
//[Clear Task] Link(bottom of html page)
const clearBtn = document.querySelector('.clear-tasks'); 
const filter = document.querySelector('#filter'); //Input for filter task
const taskInput = document.querySelector('#task'); //Input for new task

//Load All Event Listeners
loadEventListeners();

//Load All Event Listeners
function loadEventListeners(e){
  //DOM LOAD EVENT
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task event
  form.addEventListener('submit', addTask);
  //Remove Task Event
  taskList.addEventListener('click', removeTask);
  //Clear Task Events
  clearBtn.addEventListener('click', clearTasks);
  //Filter Task events
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage- check DOM load event inside loadEventLstne
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    //create li element
  const li = document.createElement('li');
  //Add class to li 
  li.className = 'collection-item';
  //Create a text node and append to li
  const text = document.createTextNode(task);
  li.appendChild(text);
  //Create new link element
  const link = document.createElement('a');
  //Add class to the link
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class= "fa fa-remove"></li>';
  //Append link to the li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);

  });
}


//FILTER DATA
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  const allTasks = document.querySelectorAll('.collection-item');
  allTasks.forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLocaleLowerCase().indexOf(text) !== -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}

//Clear Tasks
function clearTasks(e){
  //This is one way of clearing all tasks
  //taskList.innerHTML = '';

  //Loop using a while loop => Faster
  //while there is still a child (first one means there still exist some data)
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  } 
  //CLEAR FROM LOCAL STORAGE
  clearTaskFromLocalStorage();  
}

//CLEAR FROM LOCAL STORAGE
function clearTaskFromLocalStorage(){
  localStorage.clear();
}


//Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      //Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task.')
  }
  //create li element
  const li = document.createElement('li');
  //Add class to li 
  li.className = 'collection-item';
  //Create a text node and append to li
  const text = document.createTextNode(taskInput.value);
  li.appendChild(text);
  //Create new link element
  const link = document.createElement('a');
  //Add class to the link
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class= "fa fa-remove"></li>';
  //Append link to the li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);

  //STORE TASK IN LOCAL STORAGE
  storeTaskInLocalStorage(taskInput.value); //Typed in new task input

  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}