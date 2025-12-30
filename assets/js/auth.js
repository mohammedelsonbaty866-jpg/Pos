/* auth.js | POS PRO AUTH SYSTEM */

const USERS_KEY = "pos_users";
const SESSION_KEY = "pos_session";

/* =========================
   Helpers
========================= */
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

/* =========================
   Register
========================= */
function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!username || !password) {
    alert("من فضلك ادخل اسم المستخدم وكلمة المرور");
    return;
  }

  let users = getUsers();

  const exists = users.find(u => u.username === username);
  if (exists) {
    alert("اسم المستخدم موجود بالفعل");
    return;
  }

  const newUser = {
    id: Date.now(),
    username,
    password,
    role: "admin", // اول حساب مدير
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  alert("تم إنشاء الحساب بنجاح ✅");
  setSession(newUser);
  window.location.href = "index.html";
}

/* =========================
   Login
========================= */
function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("ادخل اسم المستخدم وكلمة المرور");
    return;
  }

  const users = getUsers();
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("بيانات الدخول غير صحيحة");
    return;
  }

  setSession(user);
  window.location.href = "index.html";
}

/* =========================
   Create Cashier
========================= */
function createCashier() {
  const username = document.getElementById("cashierUsername").value.trim();
  const password = document.getElementById("cashierPassword").value.trim();

  if (!username || !password) {
    alert("ادخل بيانات الكاشير");
    return;
  }

  let users = getUsers();

  if (users.find(u => u.username === username)) {
    alert("اسم المستخدم موجود");
    return;
  }

  users.push({
    id: Date.now(),
    username,
    password,
    role: "cashier",
    createdAt: new Date().toISOString()
  });

  saveUsers(users);
  alert("تم إضافة الكاشير بنجاح ✅");
}

/* =========================
   Auto Redirect (Login Page)
========================= */
(function () {
  if (window.location.pathname.includes("login.html")) {
    if (getSession()) {
      window.location.href = "index.html";
    }
  }
})();
