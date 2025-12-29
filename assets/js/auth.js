function login(){
  const u = username.value;
  const p = password.value;
  if(!u||!p) return alert("ادخل البيانات");
  localStorage.user = u;
  location.href="index.html";
}
