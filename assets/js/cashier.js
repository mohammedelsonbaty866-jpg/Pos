/*************************************************
 * CASHIER SYSTEM - POS SUPER PRO
 *************************************************/

const CART_KEY = "pos_cart";
const PRODUCTS_KEY = "pos_products";

/* ===== عناصر الصفحة ===== */
const productsGrid = document.getElementById("productsGrid");
const invoiceItems = document.getElementById("invoiceItems");
const totalBox = document.getElementById("total");

/* ===== صوت الباركود ===== */
const beepSound = new Audio("assets/sounds/beep.mp3");

/* ===== تحميل البيانات ===== */
function loadProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

function loadCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ===== عرض المنتجات ===== */
function renderProducts(filter = "") {
  const products = loadProducts();
  productsGrid.innerHTML = "";

  products
    .filter(p =>
      p.name.includes(filter) ||
      (p.barcode && p.barcode.includes(filter))
    )
    .forEach(product => {
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <strong>${product.name}</strong>
        <span>${product.price} ج</span>
      `;

      div.onclick = () => addToCart(product);
      productsGrid.appendChild(div);
    });
}

/* ===== إضافة للفاتورة ===== */
function addToCart(product) {
  let cart = loadCart();

  const existing = cart.find(i => i.id === product.id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  saveCart(cart);
  renderInvoice();
}

/* ===== عرض الفاتورة ===== */
function renderInvoice() {
  const cart = loadCart();
  invoiceItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "invoice-item";

    div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.qty} × ${item.price}</span>
    `;

    invoiceItems.appendChild(div);
  });

  totalBox.textContent = total + " ج";
}

/* ===== تفريغ الفاتورة ===== */
function clearInvoice() {
  localStorage.removeItem(CART_KEY);
  renderInvoice();
}

/* ===== حفظ الفاتورة ===== */
function saveInvoice() {
  const cart = loadCart();
  if (cart.length === 0) {
    alert("❌ لا توجد أصناف");
    return;
  }

  let invoices = JSON.parse(localStorage.getItem("pos_invoices")) || [];

  invoices.push({
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.qty, 0)
  });

  localStorage.setItem("pos_invoices", JSON.stringify(invoices));
  clearInvoice();

  alert("✅ تم حفظ الفاتورة");
}

/* ===== البحث ===== */
function searchProduct(value) {
  renderProducts(value);
}

/* ===== قراءة باركود (كيبورد / سكانر) ===== */
let barcodeBuffer = "";
let barcodeTimer = null;

document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    handleBarcode(barcodeBuffer);
    barcodeBuffer = "";
    return;
  }

  if (barcodeTimer) clearTimeout(barcodeTimer);

  barcodeBuffer += e.key;

  barcodeTimer = setTimeout(() => {
    barcodeBuffer = "";
  }, 200);
});

/* ===== معالجة الباركود ===== */
function handleBarcode(code) {
  if (!code) return;

  const products = loadProducts();
  const product = products.find(p => p.barcode === code);

  if (product) {
    beepSound.play();
    addToCart(product);
  }
}

/* ===== تشغيل ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderInvoice();
});
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الإعدادات</title>

  <link rel="stylesheet" href="../assets/css/style.css">

  <style>
    body {
      margin: 0;
      font-family: Tahoma, Arial;
      background: var(--bg);
      color: var(--text);
      transition: .3s;
    }

    :root {
      --bg: #f4f6f9;
      --card: #ffffff;
      --text: #000;
      --primary: #0d6efd;
    }

    body.dark {
      --bg: #121212;
      --card: #1e1e1e;
      --text: #fff;
      --primary: #0d6efd;
    }

    header {
      background: var(--primary);
      color: #fff;
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    header h2 {
      margin: 0;
      font-size: 18px;
    }

    .container {
      padding: 15px;
    }

    .card {
      background: var(--card);
      padding: 15px;
      border-radius: 12px;
      margin-bottom: 15px;
      box-shadow: 0 2px 6px rgba(0,0,0,.15);
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    label {
      font-size: 16px;
    }

    input[type="text"], select {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 15px;
    }

    button {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }

    .save-btn {
      background: #198754;
      color: #fff;
    }

    .back-btn {
      background: #0d6efd;
      color: #fff;
      margin-top: 10px;
    }

    .toggle {
      width: 50px;
      height: 26px;
      background: #ccc;
      border-radius: 20px;
      position: relative;
      cursor: pointer;
    }

    .toggle::after {
      content: "";
      width: 22px;
      height: 22px;
      background: #fff;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      right: 2px;
      transition: .3s;
    }

    .toggle.active {
      background: #198754;
    }

    .toggle.active::after {
      right: 26px;
    }
  </style>
</head>

<body>

<header>
  <button onclick="goBack()">⬅</button>
  <h2>الإعدادات</h2>
  <div>⚙️</div>
</header>

<div class="container">

  <!-- الوضع -->
  <div class="card">
    <h3>المظهر</h3>
    <div class="row">
      <label>الوضع الداكن</label>
      <div id="darkToggle" class="toggle"></div>
    </div>
  </div>

  <!-- إعدادات المتجر -->
  <div class="card">
    <h3>بيانات المتجر</h3>
    <label>اسم المتجر</label>
    <input type="text" id="storeName" placeholder="اسم المتجر">

    <label style="margin-top:10px;">العملة</label>
    <select id="currency">
      <option value="جنيه">جنيه</option>
      <option value="ريال">ريال</option>
      <option value="دولار">$</option>
    </select>
  </div>

  <!-- حفظ -->
  <div class="card">
    <button class="save-btn" onclick="saveSettings()">💾 حفظ الإعدادات</button>
    <button class="back-btn" onclick="goBack()">⬅ رجوع للكاشير</button>
  </div>

</div>

<script>
  const body = document.body;
  const darkToggle = document.getElementById("darkToggle");
  const storeNameInput = document.getElementById("storeName");
  const currencySelect = document.getElementById("currency");

  const settings = JSON.parse(localStorage.getItem("settings")) || {
    darkMode: false,
    storeName: "POS Pro",
    currency: "جنيه"
  };

  function applySettings() {
    if (settings.darkMode) {
      body.classList.add("dark");
      darkToggle.classList.add("active");
    }

    storeNameInput.value = settings.storeName;
    currencySelect.value = settings.currency;
  }

  darkToggle.onclick = () => {
    settings.darkMode = !settings.darkMode;
    body.classList.toggle("dark");
    darkToggle.classList.toggle("active");
  };

  function saveSettings() {
    settings.storeName = storeNameInput.value || "POS Pro";
    settings.currency = currencySelect.value;

    localStorage.setItem("settings", JSON.stringify(settings));
    alert("✅ تم حفظ الإعدادات");
  }

  function goBack() {
    window.location.href = "../index.html";
  }

  applySettings();
</script>
let invoice = [];

function addToInvoice(product) {
  invoice.push(product);
  renderInvoice();
}

function renderInvoice() {
  const box = document.getElementById("invoiceItems");
  const totalEl = document.getElementById("total");

  box.innerHTML = "";
  let total = 0;

  invoice.forEach(item => {
    total += item.price;
    box.innerHTML += `<div>${item.name} - ${item.price} ج</div>`;
  });

  totalEl.textContent = total + " ج";
}

function clearInvoice() {
  invoice = [];
  renderInvoice();
}

function saveInvoice() {
  alert("تم حفظ الفاتورة");
}
</body>
</html>
