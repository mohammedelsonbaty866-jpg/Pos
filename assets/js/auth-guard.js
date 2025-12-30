/* ===============================
   AUTH GUARD
   Protect Pages From Unauthorized Access
================================ */

(function () {

    const AUTH_KEY = "pos_user";
    const user = localStorage.getItem(AUTH_KEY);

    // الصفحات المسموح بها بدون تسجيل
    const publicPages = [
        "/login.html",
        "login.html"
    ];

    const currentPage = window.location.pathname;

    // لو مش مسجل دخول
    if (!user) {
        // ولو مش في صفحة login
        if (!publicPages.some(p => currentPage.endsWith(p))) {
            window.location.replace("login.html");
        }
    }

})();
