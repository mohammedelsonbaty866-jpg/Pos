/********************************
 * CASHIER MODULE - POS SUPER PRO
 ********************************/

/* ==============================
   بيانات الفاتورة الحالية
================================ */
let invoiceItems = [];

/* ==============================
   إضافة صنف للفاتورة
================================ */
function addToInvoice(product) {
  const existing = invoiceItems.find(i => i.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    invoiceItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  renderInvoice();
  playBeep();
}

/* ==============================
   زيادة / تقليل الكمية
================================ */
function changeQty(id, delta) {
  const item = invoiceItems.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    invoiceItems = invoiceItems.filter(i => i.id !== id);
  }

  renderInvoice();
}

/* ==============================
   حذف صنف من الفاتورة
================================ */
function removeItem(id) {
  invoiceItems = invoiceItems.filter(i => i.id !== id);
  renderInvoice();
}

/* ==============================
   عرض الفاتورة
================================ */
function renderInvoice() {
  const table = document.getElementById("invoiceTable");
  const totalEl = document.getElementById("invoiceTotal");

  if (!table || !totalEl) return;

  table.innerHTML = "";
  let total = 0;

  invoiceItems.forEach((item, index) => {
    const sub = item.qty * item.price;
    total += sub;

    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>
          <button onclick="changeQty(${item.id}, -1)">➖</button>
          ${item.qty}
          <button onclick="changeQty(${item.id}, 1)">➕</button>
        </td>
        <td>${item.price} ج</td>
        <td>${sub} ج</td>
        <td>
          <button onclick="removeItem(${item.id})">🗑</button>
        </td>
      </tr>
    `;
  });

  totalEl.textContent = total.toFixed(2) + " ج";
}

/* ==============================
   إنهاء البيع
================================ */
function checkout() {
  if (invoiceItems.length === 0) {
    alert("❌ الفاتورة فارغة");
    return;
  }

  const sales = JSON.parse(localStorage.getItem("sales")) || [];

  sales.push({
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: invoiceItems,
    total: getInvoiceTotal()
  });

  localStorage.setItem("sales", JSON.stringify(sales));

  invoiceItems = [];
  renderInvoice();

  alert("✅ تم حفظ البيع بنجاح");
}

/* ==============================
   إجمالي الفاتورة
================================ */
function getInvoiceTotal() {
  return invoiceItems.reduce((sum, i) => sum + i.qty * i.price, 0);
}

/* ==============================
   صوت البيب
================================ */
function playBeep() {
  const audio = document.getElementById("beepSound");
  if (audio) audio.play();
}

/* ==============================
   البحث من الكاشير
================================ */
function cashierSearch(value) {
  if (typeof searchProduct === "function") {
    searchProduct(value);
  }
}
