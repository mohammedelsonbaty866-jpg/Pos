/* auth-guard.js | POS PRO PAGE GUARD */

const SESSION_KEY = "pos_session";

/* =========================
   Get Session
========================= */
function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

/* =========================
   Page Guard
========================= */
(function () {
  const session = getSession();
  const currentPage = window.location.pathname;

  // لو مش مسجل دخول
  if (!session) {
    // اسمح فقط بصفحة تسجيل الدخول
    if (!currentPage.includes("login.html")) {
      window.location.href = "login.html";
    }
    return;
  }

  // لو مسجل دخول وفتح login
  if (currentPage.includes("login.html")) {
    window.location.href = "index.html";
  }
})();
