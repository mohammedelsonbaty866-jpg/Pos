// ===============================
// AUTH-GUARD.JS - POS SUPER PRO
// ===============================

// التحقق من الجلسة
(function () {
  const session = localStorage.getItem("pos_session");

  if (!session) {
    // مفيش تسجيل دخول → رجوع للوجين
    window.location.replace("login.html");
  }
})();
