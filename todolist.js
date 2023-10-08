//1. save to local storage - 
//localStorage.setItem(key,value);
//localStorage.getItem(key);
//localStorage.removeItem(key);

//1. get span tag from list
//const tempSpan = currentList[i].querySelector('span');
//tempTodolist.push(tempSpan.textContent);
//2. Add new button to delete / Done
//3. make Function delete/done todo list

//localStorage - python dictionary (= JSON format)
//{"key":"value","key2","value2".....}
//example {"JBSong":"1234", "danwoo":"abcd"...., "Jack":"qwer"}

const worktodo = document.getElementById("worktodo");
const entertodo = document.getElementById("entertodo");
const todolists = document.getElementById("todolists");

entertodo.addEventListener("click", addNewTodo);
worktodo.addEventListener('keydown', handleKeyDown);

//localStorage.removeItem("danwoo");
initTodolist();

function initTodolist() {
  const mylist = loadTodolist("danwoo");
  console.log(mylist);

  const splitTodolist = mylist.split(",");
  console.log(splitTodolist);

  //Update todoList using loaded todolist text
  for (let i = 0; i < splitTodolist.length; i++) {
    const newList = document.createElement("li"); //make new li tag <li></li>

    //if splitTodolist[i] is blank, pass!!
    if(splitTodolist[i] == "")
    {
      break;
    }
      
    //1. create Span
    const newSpan = document.createElement("span"); //TEXT
    newSpan.innerText = splitTodolist[i]; //worktodo text box value
    newList.appendChild(newSpan); //Add newSpan to new List
    //2. create button
    const newButton = document.createElement("button");
    newButton.className = "todolistButton";
    newButton.textContent = "✅";
    newButton.addEventListener("click", drawDoneline);
    newList.appendChild(newButton);
    //3. create button - delete
    const newButton2 = document.createElement("button");
    newButton2.className = "todolistButton";
    newButton2.textContent = "🗑";
    newButton2.addEventListener("click",deleteList);
    newList.appendChild(newButton2);

    //3.append to main list (to ul)
    todolists.appendChild(newList);//Add newList to todolist
  }
}

function loadTodolist(keyName) {
  //using localStorage, load my todolists...
  let myTodolist = localStorage.getItem(keyName);
  return myTodolist;
}

function saveTodolist(keyName) {
  let tempTodolist = [];
  const currentList = todolists.children; // <li></li>
  for (let i = 0; i < currentList.length; i++) {
    // currentList = newSpan(text) + newButton(button)
    // currentList -> extract only span!!  
    const tempSpan = currentList[i].querySelector('span'); //get first <span> 
    tempTodolist.push(tempSpan.textContent);
  }

  console.log(tempTodolist);
  localStorage.setItem(keyName, tempTodolist);
}

function handleKeyDown(event) {
  if (event.keyCode === 13) //if 'Enter' key is pressed
  {
    console.log("Enter key down");
    addNewTodo();
  }
}

function addNewTodo() {
  //if input value is blank, pass!!
  if (worktodo.value == "") {
    console.log("Blank new todo.. pass")
    return; //return -> function end here
  }

  //todolists(ul)  <-- newList(li) <-- newSpan(text), newButton(button)
  // span tag -> text html <span> </span>
  // button tag -> <input type="button"> 

  //1. create list 
  const newList = document.createElement("li"); //make new li tag <li></li>

  const newSpan = document.createElement("span"); //TEXT
  newSpan.innerText = worktodo.value; //worktodo text box value
  newList.appendChild(newSpan); //Add newSpan to new List

  //2. create button - done (draw center line)
  const newButton = document.createElement("button");
  newButton.className = "todolistButton";
  newButton.textContent = "✅";
  newButton.addEventListener("click", drawDoneline);
  newList.appendChild(newButton); //Add newButton to new List

  //3. create button - delete
  const newButton2 = document.createElement("button");
  newButton2.className = "todolistButton";
  newButton2.textContent = "🗑";
  newButton2.addEventListener("click",deleteList);
  newList.appendChild(newButton2);

  //add created argument to todolists
  todolists.appendChild(newList); //Add newList to todolist
  worktodo.value = "";

  saveTodolist("danwoo");
}

//add "line-through" to text - event <- javascript -> give improtant info to call interface
function drawDoneline(event) {
  //todolists(ul)  <-- newList(li) <-- newSpan(text), newButton(button), newButton(button)
  console.log(event.target.parentElement); //parent = <li> </li>
  const tempList = event.target.parentElement;
  const tempSpan = tempList.querySelector('span');
  tempSpan.style = "text-decoration:line-through";
}

//delete clicked list
function deleteList(event) {
  //todolists(ul)  <-- newList(li) <-- newSpan(text), newButton(button), newButton(button)
  console.log(event.target.parentElement); //parent = <li> </li>
  const tempList = event.target.parentElement;
  tempList.remove();
  saveTodolist("danwoo");
}
