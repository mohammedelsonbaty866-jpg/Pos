/* ================= AUTH SYSTEM ================= */

/*
  شكل التخزين:
  localStorage.users = [
    { username, password, role }
  ]

  localStorage.currentUser = {
    username, role
  }
*/

const AUTH_USERS_KEY = "users";
const AUTH_SESSION_KEY = "currentUser";

/* تحميل المستخدمين */
function getUsers() {
  return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "[]");
}

/* حفظ المستخدمين */
function saveUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

/* ================= REGISTER ================= */
function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!username || !password) {
    alert("من فضلك أدخل اسم المستخدم وكلمة المرور");
    return;
  }

  let users = getUsers();

  if (users.find(u => u.username === username)) {
    alert("اسم المستخدم موجود بالفعل");
    return;
  }

  users.push({
    username,
    password,
    role: "admin" // أول حساب مدير
  });

  saveUsers(users);

  alert("تم إنشاء الحساب بنجاح");
  login(username, password);
}

/* ================= LOGIN ================= */
function login(user = null, pass = null) {
  const username = user || document.getElementById("loginUsername").value.trim();
  const password = pass || document.getElementById("loginPassword").value.trim();

  let users = getUsers();
  let found = users.find(
    u => u.username === username && u.password === password
  );

  if (!found) {
    alert("بيانات الدخول غير صحيحة");
    return;
  }

  localStorage.setItem(
    AUTH_SESSION_KEY,
    JSON.stringify({
      username: found.username,
      role: found.role
    })
  );

  window.location.href = "index.html";
}

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem(AUTH_SESSION_KEY);
  window.location.href = "login.html";
}

/* ================= CURRENT USER ================= */
function getCurrentUser() {
  return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY));
}
