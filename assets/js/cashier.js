/*************************************************
 * CASHIER SYSTEM - POS SUPER PRO
 *************************************************/

let invoice = [];
let products = JSON.parse(localStorage.getItem("products")) || [];

/* ===== عناصر الصفحة ===== */
const productsGrid = document.getElementById("productsGrid");
const invoiceItems = document.getElementById("invoiceItems");
const totalEl = document.getElementById("total");

/* ===== صوت الباركود ===== */
const beepSound = new Audio("assets/sounds/beep.mp3");

/* ===== عرض المنتجات في الكاشير ===== */
function renderProductsGrid(list = products) {
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <strong>${product.name}</strong>
      <span>${product.price.toFixed(2)} ج</span>
    `;
    card.onclick = () => addToInvoice(product.id);
    productsGrid.appendChild(card);
  });
}

/* ===== إضافة صنف للفاتورة ===== */
function addToInvoice(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const item = invoice.find(i => i.id === productId);

  if (item) {
    item.qty += 1;
  } else {
    invoice.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  renderInvoice();
}

/* ===== إضافة بالباركود ===== */
function addByBarcode(code) {
  const product = products.find(p => p.barcode === code);
  if (!product) {
    alert("الصنف غير موجود");
    return;
  }

  beepSound.play();
  addToInvoice(product.id);
}

/* ===== عرض الفاتورة ===== */
function renderInvoice() {
  if (!invoiceItems) return;

  invoiceItems.innerHTML = "";
  let total = 0;

  invoice.forEach((item, index) => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "invoice-row";
    row.innerHTML = `
      <span>${index + 1}</span>
      <span>${item.name}</span>
      <span>${item.qty} × ${item.price}</span>
      <span>${(item.qty * item.price).toFixed(2)}</span>
      <button onclick="removeItem(${item.id})">✕</button>
    `;

    invoiceItems.appendChild(row);
  });

  totalEl.textContent = total.toFixed(2) + " ج";
}

/* ===== حذف عنصر ===== */
function removeItem(id) {
  invoice = invoice.filter(i => i.id !== id);
  renderInvoice();
}

/* ===== حفظ الفاتورة ===== */
function saveInvoice() {
  if (invoice.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }

  const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

  invoices.push({
    id: Date.now(),
    date: new Date().toLocaleString("ar-EG"),
    items: invoice,
    total: totalEl.textContent
  });

  localStorage.setItem("invoices", JSON.stringify(invoices));

  alert("تم حفظ الفاتورة");
  clearInvoice();
}

/* ===== تفريغ الفاتورة ===== */
function clearInvoice() {
  if (!confirm("تفريغ الفاتورة؟")) return;
  invoice = [];
  renderInvoice();
}

/* ===== بحث منتجات ===== */
function searchProduct(keyword) {
  keyword = keyword.toLowerCase();

  if (!keyword) {
    renderProductsGrid();
    return;
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    (p.barcode && p.barcode.includes(keyword))
  );

  renderProductsGrid(filtered);
}

/* ===== تحميل ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProductsGrid();
});
