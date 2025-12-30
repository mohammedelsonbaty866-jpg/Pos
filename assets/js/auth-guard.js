/* ===============================
   AUTH GUARD - POS PRO
================================ */

const SESSION_KEY = "pos_session";

/* ===== CHECK AUTH ===== */
(function authGuard() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));

  const isLoginPage =
    window.location.pathname.includes("login.html");

  if (!session && !isLoginPage) {
    // مش مسجل دخول
    window.location.href = "login.html";
    return;
  }

  if (session && isLoginPage) {
    // مسجل دخول وداخل صفحة لوجين
    window.location.href = "index.html";
  }
})();

/* ===== GET CURRENT USER ===== */
function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}
