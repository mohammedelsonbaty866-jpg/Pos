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
