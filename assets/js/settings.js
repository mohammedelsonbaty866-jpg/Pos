/********************************
 * SETTINGS MODULE - POS SUPER PRO
 ********************************/

document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  bindSettingsEvents();
});

/* ==============================
   تحميل الإعدادات
================================ */
function loadSettings() {
  const theme = localStorage.getItem("theme") || "light";
  applyTheme(theme);

  const storeName = localStorage.getItem("storeName") || "";
  const storePhone = localStorage.getItem("storePhone") || "";

  if (document.getElementById("storeName")) {
    document.getElementById("storeName").value = storeName;
  }

  if (document.getElementById("storePhone")) {
    document.getElementById("storePhone").value = storePhone;
  }
}

/* ==============================
   ربط الأحداث
================================ */
function bindSettingsEvents() {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("change", e => {
      const theme = e.target.checked ? "dark" : "light";
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    });
  }
}

/* ==============================
   تطبيق الثيم
================================ */
function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);

  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.checked = theme === "dark";
}

/* ==============================
   حفظ بيانات المتجر
================================ */
function saveStoreInfo() {
  const name = document.getElementById("storeName").value.trim();
  const phone = document.getElementById("storePhone").value.trim();

  localStorage.setItem("storeName", name);
  localStorage.setItem("storePhone", phone);

  alert("✅ تم حفظ الإعدادات");
}

/* ==============================
   إعادة ضبط البرنامج
================================ */
function resetApp() {
  if (!confirm("⚠️ سيتم مسح كل البيانات، هل أنت متأكد؟")) return;

  localStorage.clear();
  alert("✅ تم إعادة ضبط البرنامج");
  location.href = "login.html";
}
