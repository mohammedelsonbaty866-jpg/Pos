/********************************
 * CASHIER LOGIC - POS PRO
 ********************************/

let cart = [];

/* ==============================
   تحميل المنتجات في الكاشير
================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderProductsGrid();
  updateTotal();
});

/* ==============================
   جلب الأصناف
================================ */
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

/* ==============================
   عرض المنتجات في الشبكة
================================ */
function renderProductsGrid(filtered = null) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const products = filtered || getProducts();
  grid.innerHTML = "";

  products.forEach(product => {
    const btn = document.createElement("button");
    btn.className = "product-btn";
    btn.innerHTML = `
      <strong>${product.name}</strong>
      <span>${product.price.toFixed(2)} ج</span>
    `;

    btn.onclick = () => addToCart(product.id);
    grid.appendChild(btn);
  });
}

/* ==============================
   إضافة صنف للفاتورة
================================ */
function addToCart(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const item = cart.find(i => i.id === productId);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  playBeep();
  renderInvoice();
}

/* ==============================
   عرض الفاتورة
================================ */
function renderInvoice() {
  const box = document.getElementById("invoiceItems");
  if (!box) return;

  box.innerHTML = "";

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "invoice-row";

    row.innerHTML = `
      <span>${item.name}</span>
      <span>${item.qty} × ${item.price}</span>
      <span>${(item.qty * item.price).toFixed(2)}</span>
      <button onclick="removeItem(${index})">✖</button>
    `;

    box.appendChild(row);
  });

  updateTotal();
}

/* ==============================
   حذف صنف من الفاتورة
================================ */
function removeItem(index) {
  cart.splice(index, 1);
  renderInvoice();
}

/* ==============================
   تحديث الإجمالي
================================ */
function updateTotal() {
  const totalBox = document.getElementById("total");
  if (!totalBox) return;

  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  totalBox.innerText = total.toFixed(2) + " ج";
}

/* ==============================
   حفظ الفاتورة
================================ */
function saveInvoice() {
  if (cart.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }

  const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

  invoices.push({
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: cart,
    total: cart.reduce((s, i) => s + i.qty * i.price, 0)
  });

  localStorage.setItem("invoices", JSON.stringify(invoices));

  clearInvoice();
  alert("تم حفظ الفاتورة");
}

/* ==============================
   تفريغ الفاتورة
================================ */
function clearInvoice() {
  cart = [];
  renderInvoice();
}

/* ==============================
   البحث بالكاشير (اسم / باركود)
================================ */
function searchProduct(query) {
  query = query.trim().toLowerCase();
  const products = getProducts();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    (p.barcode && p.barcode.includes(query))
  );

  renderProductsGrid(filtered);
}

/* ==============================
   صوت الباركود
================================ */
function playBeep() {
  const sound = document.getElementById("beepSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
