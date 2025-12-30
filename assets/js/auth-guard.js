/* ============ AUTH GUARD ============ */

const SESSION_KEY = "currentUser";

/* تحقق من تسجيل الدخول */
function requireAuth() {
  const user = JSON.parse(localStorage.getItem(SESSION_KEY));

  if (!user) {
    window.location.replace("login.html");
  }
}

/* منع الرجوع لصفحة اللوجين بعد الدخول */
function blockLoginPage() {
  const user = JSON.parse(localStorage.getItem(SESSION_KEY));

  if (user) {
    window.location.replace("index.html");
  }
}
