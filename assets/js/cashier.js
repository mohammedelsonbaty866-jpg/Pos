// ===============================
// CASHIER.JS - POS SUPER PRO
// ===============================

let invoice = [];

// إضافة صنف للفاتورة
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

  playBeep();
  renderInvoice();
}

// عرض الفاتورة
function renderInvoice() {
  const container = document.getElementById("invoiceItems");
  const totalEl = document.getElementById("total");

  container.innerHTML = "";
  let total = 0;

  invoice.forEach((item, index) => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "invoice-row";
    row.innerHTML = `
      <span>${index + 1}</span>
      <span>${item.name}</span>
      <span>${item.qty}</span>
      <span>${item.price * item.qty} ج</span>
      <button onclick="removeItem('${item.id}')">✖</button>
    `;
    container.appendChild(row);
  });

  totalEl.innerText = total + " ج";
}

// حذف صنف
function removeItem(id) {
  invoice = invoice.filter(item => item.id !== id);
  renderInvoice();
}

// تفريغ الفاتورة
function clearInvoice() {
  if (!confirm("تفريغ الفاتورة؟")) return;
  invoice = [];
  renderInvoice();
}

// حفظ الفاتورة
function saveInvoice() {
  if (invoice.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }

  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

  invoices.push({
    id: generateID(),
    date: new Date().toISOString(),
    items: invoice
  });

  localStorage.setItem("invoices", JSON.stringify(invoices));
  clearInvoice();
  alert("تم حفظ الفاتورة بنجاح");
}

// صوت الباركود
function playBeep() {
  const sound = document.getElementById("beepSound");
  if (sound) sound.play();
}
const productsList = document.getElementById("productsList");
const cartList = document.getElementById("cartList");
const totalEl = document.getElementById("total");
const beep = document.getElementById("beep");

let cart = [];

function renderProducts() {
  products.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "product-btn";
    btn.innerHTML = `${p.name}<br>${p.price}ج`;
    btn.onclick = () => addToCart(p);
    productsList.appendChild(btn);
  });
}

function addToCart(product) {
  beep.play();
  const item = cart.find(i => i.id === product.id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} × ${item.qty}
      <button onclick="removeItem(${item.id})">❌</button>
    `;
    cartList.appendChild(li);
  });

  totalEl.textContent = total;
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function checkout() {
  alert("تمت عملية البيع بنجاح ✅");
  cart = [];
  renderCart();
}

renderProducts();
