/*************************************************
 * auth-guard.js
 * يحمي الصفحات من الدخول بدون تسجيل
 *************************************************/

(function () {
  const isLoggedIn = localStorage.getItem("pos_logged_in");
  const currentPage = window.location.pathname.split("/").pop();

  // الصفحات اللي مسموح تدخلها بدون تسجيل
  const publicPages = ["login.html"];

  if (!isLoggedIn && !publicPages.includes(currentPage)) {
    // مش مسجل → رجوع لتسجيل الدخول
    window.location.href = "login.html";
    return;
  }

  if (isLoggedIn && currentPage === "login.html") {
    // مسجل ودخل على login → حوله للكاشير
    window.location.href = "index.html";
    return;
  }
})();
