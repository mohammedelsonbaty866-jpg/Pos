/* ===============================
   AUTH SYSTEM
================================ */

const AUTH_KEY = "pos_user";

// مستخدم افتراضي (نسخة برو مبدئية)
const USERS = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "cashier", password: "1234", role: "cashier" }
];

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = USERS.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      errorMsg.innerText = "❌ اسم المستخدم أو كلمة المرور غير صحيحة";
      return;
    }

    // حفظ المستخدم
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));

    // تحويل لصفحة الكاشير
    window.location.href = "index.html";
  });

});
