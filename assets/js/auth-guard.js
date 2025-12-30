/* auth-guard.js | Route Protection */

const SESSION_KEY = "pos_user_session";

/**
 * يمنع الدخول للصفحات بدون تسجيل دخول
 */
function requireAuth() {
    const session = localStorage.getItem(SESSION_KEY);

    if (!session) {
        window.location.href = "login.html";
        return;
    }
}

/**
 * يمنع فتح صفحة تسجيل الدخول لو المستخدم مسجل بالفعل
 */
function redirectIfLoggedIn() {
    const session = localStorage.getItem(SESSION_KEY);

    if (session) {
        window.location.href = "index.html";
    }
}

/**
 * جلب بيانات المستخدم الحالي
 */
function getCurrentUser() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}
