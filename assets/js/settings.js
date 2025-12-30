/********************************
 * SETTINGS LOGIC - POS SUPER PRO
 ********************************/

/* ==============================
   تحميل الإعدادات
================================ */
function loadSettings() {
  const settings = JSON.parse(localStorage.getItem("settings")) || {};

  // اسم المحل
  if (settings.shopName) {
    const shopNameEl = document.getElementById("shopName");
    if (shopNameEl) shopNameEl.textContent = settings.shopName;
  }

  // الوضع الليلي
  if (settings.theme === "dark") {
    document.body.classList.add("dark");
  }
}

/* ==============================
   حفظ الإعدادات
================================ */
function saveSettings() {
  const shopNameInput = document.getElementById("shopNameInput");
  const darkModeToggle = document.getElementById("darkModeToggle");

  const settings = {
    shopName: shopNameInput ? shopNameInput.value : "POS Pro",
    theme: darkModeToggle && darkModeToggle.checked ? "dark" : "light"
  };

  localStorage.setItem("settings", JSON.stringify(settings));
  alert("✅ تم حفظ الإعدادات");

  loadSettings();
}

/* ==============================
   تبديل الوضع الداكن فورًا
================================ */
function toggleTheme() {
  document.body.classList.toggle("dark");

  const settings = JSON.parse(localStorage.getItem("settings")) || {};
  settings.theme = document.body.classList.contains("dark") ? "dark" : "light";

  localStorage.setItem("settings", JSON.stringify(settings));
}

/* ==============================
   تهيئة الصفحة
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
});
