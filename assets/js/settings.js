/*************************************************
 * SETTINGS SYSTEM - POS SUPER PRO
 *************************************************/

const SETTINGS_KEY = "pos_settings";

/* ===== تحميل الإعدادات ===== */
function loadSettings() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
    shopName: "POS Pro",
    theme: "light"
  };
}

/* ===== حفظ الإعدادات ===== */
function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

/* ===== تطبيق الثيم ===== */
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

/* ===== عند فتح الصفحة ===== */
document.addEventListener("DOMContentLoaded", () => {
  const settings = loadSettings();

  // عناصر الصفحة
  const shopNameInput = document.getElementById("shopName");
  const themeToggle = document.getElementById("themeToggle");

  if (shopNameInput) shopNameInput.value = settings.shopName;
  if (themeToggle) themeToggle.checked = settings.theme === "dark";

  applyTheme(settings.theme);

  /* ===== تغيير اسم المحل ===== */
  shopNameInput?.addEventListener("input", e => {
    settings.shopName = e.target.value;
    saveSettings(settings);
  });

  /* ===== تغيير الوضع ===== */
  themeToggle?.addEventListener("change", e => {
    settings.theme = e.target.checked ? "dark" : "light";
    saveSettings(settings);
    applyTheme(settings.theme);
  });
});

/* ===== زر الرجوع للكاشير ===== */
function backToCashier() {
  window.location.href = "index.html";
}
