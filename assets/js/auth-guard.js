if (!localStorage.session) {
  location.href = "/login.html";
}

function logout() {
  localStorage.removeItem("session");
  location.href = "login.html";
}
