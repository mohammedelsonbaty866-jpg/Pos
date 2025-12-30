/* ===============================
   AUTH SYSTEM - POS PRO
================================ */

const USERS_KEY = "pos_users";
const SESSION_KEY = "pos_session";

/* ===== INIT DEFAULT ADMIN ===== */
(function initAdmin() {
  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  if (!users.find(u => u.username === "admin")) {
    users.push({
      username: "admin",
      password: "1234",
      role: "admin"
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
})();

/* ===== LOGIN ===== */
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("ادخل اسم المستخدم وكلمة المرور");
    return;
  }

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("بيانات الدخول غير صحيحة");
    return;
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      username: user.username,
      role: user.role,
      time: Date.now()
    })
  );

  window.location.href = "../index.html";
}

/* ===== LOGOUT ===== */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "../login.html";
}

/* ===== REGISTER CASHIER (ADMIN) ===== */
function registerCashier(username, password) {
  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  if (users.find(u => u.username === username)) {
    alert("اسم المستخدم موجود بالفعل");
    return false;
  }

  users.push({
    username,
    password,
    role: "cashier"
  });

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  alert("تم إضافة الكاشير بنجاح");
  return true;
}
