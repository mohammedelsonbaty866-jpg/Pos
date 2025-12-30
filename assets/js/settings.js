/*************************************************
 * SETTINGS SYSTEM - POS SUPER PRO
 *************************************************/

/* ===== مفاتيح التخزين ===== */
const SETTINGS_KEY = "pos_settings";

/* ===== تحميل الإعدادات ===== */
function loadSettings() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
    shopName: "POS Super Pro",
    theme: "light", // light | dark
    currency: "جنيه",
    barcodeSound: true
  };
}

/* ===== حفظ الإعدادات ===== */
function saveSettings(data) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
}

/* ===== عناصر الصفحة ===== */
const shopNameInput = document.getElementById("shopNameInput");
const themeToggle = document.getElementById("themeToggle");
const currencyInput = document.getElementById("currencyInput");
const barcodeSoundToggle = document.getElementById("barcodeSoundToggle");
const saveBtn = document.getElementById("saveSettingsBtn");

/* ===== تطبيق الثيم ===== */
function applyTheme(theme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
}

/* ===== تحميل الإعدادات عند الفتح ===== */
document.addEventListener("DOMContentLoaded", () => {
  const settings = loadSettings();

  if (shopNameInput) shopNameInput.value = settings.shopName;
  if (currencyInput) currencyInput.value = settings.currency;
  if (barcodeSoundToggle) barcodeSoundToggle.checked = settings.barcodeSound;
  if (themeToggle) themeToggle.value = settings.theme;

  applyTheme(settings.theme);
});

/* ===== حفظ الإعدادات ===== */
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const newSettings = {
      shopName: shopNameInput.value || "POS Super Pro",
      currency: currencyInput.value || "جنيه",
      barcodeSound: barcodeSoundToggle.checked,
      theme: themeToggle.value
    };

    saveSettings(newSettings);
    applyTheme(newSettings.theme);

    alert("✅ تم حفظ الإعدادات بنجاح");
  });
}
