/*************************
 * SETTINGS & THEME
 *************************/

// فتح صفحة الإعدادات
function goSettings() {
  window.location.href = "pages/settings.html";
}

// تسجيل خروج
function logout() {
  localStorage.removeItem("pos_user");
  window.location.href = "login.html";
}

// ===== الوضع الليلي =====
document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("pos_theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) themeBtn.textContent = "☀️";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
});

function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("pos_theme", isDark ? "dark" : "light");

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.textContent = isDark ? "☀️" : "🌙";
  }
}
