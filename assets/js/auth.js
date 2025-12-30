/* auth.js | Authentication Logic */

const SESSION_KEY = "pos_user_session";

/* =========================
   Login
========================= */
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("من فضلك أدخل اسم المستخدم وكلمة المرور");
    return;
  }

  const db = loadDB();
  const user = db.users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("بيانات الدخول غير صحيحة");
    return;
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.location.href = "index.html";
}

/* =========================
   Logout
========================= */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

/* =========================
   Current User
========================= */
function getCurrentUser() {
  const user = localStorage.getItem(SESSION_KEY);
  return user ? JSON.parse(user) : null;
}
