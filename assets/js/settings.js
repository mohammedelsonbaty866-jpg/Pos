function setTheme(t){
  document.body.className = t;
  localStorage.theme = t;
}

function resetData(){
  if(confirm("متأكد؟")){
    localStorage.clear();
    location.href = "../login.html";
  }
}

if(localStorage.theme){
  document.body.className = localStorage.theme;
}
