const users = [
  {user:"admin", pass:"1234", role:"admin"},
  {user:"cashier", pass:"1234", role:"cashier"}
];

function login(){
  const u = username.value;
  const p = password.value;
  const found = users.find(x=>x.user===u && x.pass===p);
  if(!found){
    msg.innerText="بيانات غير صحيحة";
    return;
  }
  localStorage.setItem("user", JSON.stringify(found));
  location.href="dashboard.html";
}
