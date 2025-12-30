/* ==============================
   Page Protection | POS Pro
================================ */

const SESSION_KEY = "pos_user_session";

(function protectPage() {
  const user = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (!user) {
    window.location.href = "/login.html";
  }
})();
