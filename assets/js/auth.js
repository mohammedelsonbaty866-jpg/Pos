// ===============================
// AUTH.JS - POS SUPER PRO
// ===============================

// عناصر الواجهة
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authMessage = document.getElementById("authMessage");

// تحميل المستخدمين
function getUsers() {
  return JSON.parse(localStorage.getItem("pos_users")) || [];
}

// حفظ المستخدمين
function saveUsers(users) {
  localStorage.setItem("pos_users", JSON.stringify(users));
}

// ===============================
// تسجيل حساب جديد
// ===============================
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document
      .getElementById("registerUsername")
      .value.trim();
    const password = document
      .getElementById("registerPassword")
      .value.trim();

    if (!username || !password) {
      authMessage.textContent = "⚠️ أكمل كل البيانات";
      return;
    }

    const users = getUsers();

    const exists = users.find((u) => u.username === username);
    if (exists) {
      authMessage.textContent = "❌ اسم المستخدم موجود بالفعل";
      return;
    }

    users.push({ username, password, role: "admin" });
    saveUsers(users);

    authMessage.textContent = "✅ تم إنشاء الحساب بنجاح — سجل الدخول";
  });
}

// ===============================
// تسجيل الدخول
// ===============================
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document
      .getElementById("loginUsername")
      .value.trim();
    const password = document
      .getElementById("loginPassword")
      .value.trim();

    const users = getUsers();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      authMessage.textContent = "❌ بيانات الدخول غير صحيحة";
      return;
    }

    // حفظ الجلسة
    localStorage.setItem("pos_session", JSON.stringify(user));

    // الدخول للكاشير
    window.location.href = "index.html";
  });
}
