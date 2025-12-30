/* =========================
   SETTINGS.JS – POS SUPER PRO
   ========================= */

/* ===== عناصر الصفحة ===== */
const darkModeToggle = document.getElementById("darkModeToggle");
const barcodeSoundToggle = document.getElementById("barcodeSoundToggle");

/* ===== تحميل الإعدادات ===== */
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  loadSoundSetting();
});

/* ===== الوضع الداكن ===== */
function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";

  if (theme === "dark") {
    document.body.classList.add("dark");
    if (darkModeToggle) darkModeToggle.checked = true;
  }
}

if (darkModeToggle) {
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
}

/* ===== صوت الباركود ===== */
function loadSoundSetting() {
  const sound = localStorage.getItem("barcodeSound");

  if (sound === "off") {
    if (barcodeSoundToggle) barcodeSoundToggle.checked = false;
  } else {
    if (barcodeSoundToggle) barcodeSoundToggle.checked = true;
  }
}

if (barcodeSoundToggle) {
  barcodeSoundToggle.addEventListener("change", () => {
    if (barcodeSoundToggle.checked) {
      localStorage.setItem("barcodeSound", "on");
    } else {
      localStorage.setItem("barcodeSound", "off");
    }
  });
}

/* ===== مسح كل البيانات ===== */
function resetData() {
  const confirmDelete = confirm(
    "هل أنت متأكد؟ سيتم حذف جميع البيانات نهائيًا!"
  );

  if (!confirmDelete) return;

  localStorage.removeItem("products");
  localStorage.removeItem("invoices");
  localStorage.removeItem("currentInvoice");

  alert("✅ تم مسح جميع البيانات بنجاح");
}
