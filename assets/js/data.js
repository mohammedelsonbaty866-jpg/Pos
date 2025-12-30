// ===============================
// DATA.JS - POS SUPER PRO
// ===============================

// مفاتيح التخزين
const PRODUCTS_KEY = "pos_products";
const INVOICES_KEY = "pos_invoices";

// تحميل المنتجات
function loadProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

// حفظ المنتجات
function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// تحميل الفواتير
function loadInvoices() {
  return JSON.parse(localStorage.getItem(INVOICES_KEY)) || [];
}

// حفظ الفواتير
function saveInvoices(invoices) {
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

// إنشاء ID فريد
function generateID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
const products = [
  {
    id: 1,
    name: "بيبسي",
    price: 10,
    barcode: "6221048720013"
  },
  {
    id: 2,
    name: "شيبسي",
    price: 5,
    barcode: "6223001360154"
  },
  {
    id: 3,
    name: "مياه",
    price: 4,
    barcode: "6221146000147"
  }
];
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>POS Super Pro | الكاشير</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- PWA -->
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#0d6efd">

  <!-- CSS -->
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/theme.css">

  <!-- Icons -->
  <link rel="apple-touch-icon" href="assets/icons/icon-192.png">
</head>

<body class="light">

<!-- ===== HEADER ===== -->
<header class="top-bar">
  <div class="logo">POS <span>Super Pro</span></div>

  <nav class="nav-links">
    <a href="index.html" class="active">الكاشير</a>
    <a href="pages/products.html">الأصناف</a>
    <a href="pages/reports.html">التقارير</a>
    <a href="pages/settings.html">الإعدادات</a>
  </nav>

  <div class="top-actions">
    <button onclick="toggleTheme()" title="فاتح / داكن">🌙</button>
    <button onclick="logout()" title="تسجيل خروج">⏻</button>
  </div>
</header>

<!-- ===== MAIN ===== -->
<main class="pos-layout">

  <!-- ===== PRODUCTS ===== -->
  <section class="products-panel">
    <h2>المنتجات</h2>

    <div class="search-box">
      <input
        type="text"
        id="searchInput"
        placeholder="بحث بالاسم أو الباركود"
        oninput="searchProducts(this.value)"
      >
      <button onclick="startBarcodeScan()">📷</button>
    </div>

    <div id="productsGrid" class="products-grid">
      <!-- المنتجات تظهر هنا -->
    </div>
  </section>

  <!-- ===== INVOICE ===== -->
  <section class="invoice-panel">
    <h2>الفاتورة</h2>

    <div id="invoiceItems" class="invoice-items">
      <!-- عناصر الفاتورة -->
    </div>

    <div class="total-box">
      <span>الإجمالي</span>
      <strong id="total">0 ج</strong>
    </div>

    <div class="invoice-actions">
      <button class="btn-save" onclick="saveInvoice()">💾 حفظ</button>
      <button class="btn-clear" onclick="clearInvoice()">🗑 تفريغ</button>
    </div>
  </section>

</main>

<!-- ===== FOOTER ===== -->
<footer class="footer">
  POS Super Pro © 2025
</footer>

<!-- ===== JS ===== -->
<script src="assets/js/auth-guard.js"></script>
<script src="assets/js/data.js"></script>
<script src="assets/js/products.js"></script>
<script src="assets/js/barcode.js"></script>
<script src="assets/js/cashier.js"></script>
<script src="assets/js/settings.js"></script>

<!-- ===== SERVICE WORKER ===== -->
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
</script>

</body>
</html>
