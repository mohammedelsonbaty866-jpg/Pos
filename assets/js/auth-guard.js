const user = JSON.parse(localStorage.getItem("user"));
if(!user){
  location.href="index.html";
}

function logout(){
  localStorage.removeItem("user");
  location.href="index.html";
}
