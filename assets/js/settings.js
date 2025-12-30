/* ===============================
   SETTINGS.JS | POS SUPER PRO
================================ */

// عند فتح صفحة الإعدادات
document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  applySavedTheme();
});

/* ===============================
   USER
================================ */
function loadUser() {
  const user = localStorage.getItem("currentUser");
  document.getElementById("currentUser").innerText =
    user ? user : "غير معروف";
}

/* ===============================
   THEME (LIGHT / DARK)
================================ */
function toggleTheme() {
  const current = localStorage.getItem("theme") || "light";
  const next = current === "light" ? "dark" : "light";
  localStorage.setItem("theme", next);
  applySavedTheme();
}

function applySavedTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
}

/* ===============================
   BARCODE SOUND
================================ */
function toggleBeep() {
  const enabled = localStorage.getItem("beep") !== "off";
  localStorage.setItem("beep", enabled ? "off" : "on");
  alert(
    enabled
      ? "🔇 تم إيقاف صوت الباركود"
      : "🔊 تم تشغيل صوت الباركود"
  );
}

/* ===============================
   LOGOUT
================================ */
function logout() {
  if (!confirm("هل أنت متأكد من تسجيل الخروج؟")) return;

  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");

  window.location.href = "../login.html";
}

/* ===============================
   SYSTEM
================================ */
function clearData() {
  if (!confirm("سيتم مسح كل البيانات، هل أنت متأكد؟")) return;

  localStorage.clear();
  alert("✅ تم مسح البيانات");
  location.reload();
}

function reloadApp() {
  location.reload();
}

/* ===============================
   NAVIGATION
================================ */
function goCashier() {
  window.location.href = "../index.html";
}
// تحميل الوضع المحفوظ
document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme") || "light";
  applyTheme(theme);
});

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
