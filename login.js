const userID = document.getElementById("userID");
const userPW = document.getElementById("userPW");
const loginButton = document.getElementById("loginButton");

const myID = "danwoo";
const myPW = "12341234";

loginButton.addEventListener('click',loginFunction);

function loginFunction(){
  console.log("Function Click");

  if(userID.value == myID && userPW.value == myPW){
    console.log("Correct ID and PW!!");
    window.location.href = "todolist.html";
  }
  else{
    console.log("Connection Fail.");
    alert("INVALID USER and Pasword....FAIL....")
    
  }
}

