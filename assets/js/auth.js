/* ==============================
   Authentication Logic | POS Pro
================================ */

const SESSION_KEY = "pos_user_session";
const DB_KEY = "pos_database";

/* إنشاء قاعدة بيانات افتراضية أول مرة */
function initDB() {
  if (!localStorage.getItem(DB_KEY)) {
    const db = {
      users: [
        {
          username: "admin",
          password: "1234",
          role: "admin"
        }
      ]
    };
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }
}

/* تحميل قاعدة البيانات */
function loadDB() {
  return JSON.parse(localStorage.getItem(DB_KEY));
}

/* تسجيل الدخول */
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (!username || !password) {
    error.innerText = "من فضلك أدخل اسم المستخدم وكلمة المرور";
    return;
  }

  initDB();
  const db = loadDB();

  const user = db.users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    error.innerText = "بيانات الدخول غير صحيحة";
    return;
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      username: user.username,
      role: user.role
    })
  );

  window.location.href = "index.html";
}

/* تسجيل الخروج */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

/* المستخدم الحالي */
function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}
