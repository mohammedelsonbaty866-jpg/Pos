/*************************************************
 * auth.js
 * مسؤول عن تسجيل الدخول وتخزين الجلسة
 *************************************************/

// مستخدمين تجريبيين (تقدر تعدلهم بعدين)
const USERS = [
  {
    username: "admin",
    password: "1234",
    role: "admin"
  },
  {
    username: "cashier",
    password: "1234",
    role: "cashier"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorBox = document.getElementById("loginError");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = USERS.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      errorBox.textContent = "❌ اسم المستخدم أو كلمة المرور غير صحيحة";
      return;
    }

    // حفظ الجلسة
    localStorage.setItem("pos_logged_in", "true");
    localStorage.setItem("pos_user", JSON.stringify(user));

    // تحويل للكاشير
    window.location.href = "index.html";
  });
});
