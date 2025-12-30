/* ===============================
   AUTH SYSTEM (LOGIN / REGISTER)
================================ */

const AUTH_KEY = "pos_user";

/* ===== HELPERS ===== */
function getUsers() {
    return JSON.parse(localStorage.getItem("pos_users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("pos_users", JSON.stringify(users));
}

/* ===== REGISTER ===== */
function registerUser() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!username || !password) {
        alert("من فضلك أدخل اسم المستخدم وكلمة المرور");
        return;
    }

    let users = getUsers();

    if (users.find(u => u.username === username)) {
        alert("اسم المستخدم موجود بالفعل");
        return;
    }

    users.push({
        username,
        password,
        role: "admin" // أول حساب مدير
    });

    saveUsers(users);
    alert("تم إنشاء الحساب بنجاح");
    window.location.href = "login.html";
}

/* ===== LOGIN ===== */
function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = getUsers();
    let user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        alert("بيانات الدخول غير صحيحة");
        return;
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    window.location.href = "index.html";
}

/* ===== LOGOUT ===== */
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "login.html";
}

/* ===== CURRENT USER ===== */
function getCurrentUser() {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
}
