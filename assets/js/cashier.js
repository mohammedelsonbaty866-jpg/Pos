const PRODUCTS_KEY = "pos_products";
let cart = [];

// تحميل الأصناف
function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

// عرض الأصناف
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const search = document.getElementById("search").value.toLowerCase();
  const products = getProducts();

  grid.innerHTML = "";

  products
    .filter(p =>
      p.name.toLowerCase().includes(search) ||
      (p.barcode && p.barcode.includes(search))
    )
    .forEach(p => {
      const btn = document.createElement("button");
      btn.className = "product-btn";
      btn.innerHTML = `
        <strong>${p.name}</strong>
        <span>${p.price} ج</span>
      `;
      btn.onclick = () => addToCart(p);
      grid.appendChild(btn);
    });

  if (products.length === 0) {
    grid.innerHTML = "<p>لا توجد أصناف – أضف أصناف أولاً</p>";
  }
}

// إضافة للفاتورة
function addToCart(product) {
  cart.push(product);
  renderCart();
}

// عرض الفاتورة
function renderCart() {
  const cartDiv = document.getElementById("cart");
  const totalSpan = document.getElementById("total");

  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((p, i) => {
    total += p.price;
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <span>${p.name}</span>
      <span>${p.price} ج</span>
      <button onclick="removeItem(${i})">❌</button>
    `;
    cartDiv.appendChild(row);
  });

  totalSpan.textContent = total;
}

// حذف عنصر
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// حفظ الفاتورة
function saveInvoice() {
  if (cart.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }
  alert("تم حفظ الفاتورة ✅");
  clearCart();
}

// تفريغ
function clearCart() {
  cart = [];
  renderCart();
}

// تنقل
function goPage(path) {
  window.location.href = path;
}

// تحميل أولي
renderProducts();
function saveInvoice() {
  // جلب الإجمالي
  const totalText = document.getElementById("totalAmount")?.innerText || "0";
  const total = parseFloat(totalText);

  if (total <= 0) {
    alert("لا توجد فاتورة للحفظ");
    return;
  }

  // إنشاء فاتورة
  const invoice = {
    id: Date.now(),
    total: total,
    date: new Date().toLocaleString("ar-EG")
  };

  // جلب التقارير القديمة
  let sales = JSON.parse(localStorage.getItem("sales")) || [];

  // إضافة الفاتورة
  sales.push(invoice);

  // حفظ في التخزين
  localStorage.setItem("sales", JSON.stringify(sales));

  alert("✅ تم حفظ الفاتورة في التقارير");

  // تصفير الفاتورة
  document.getElementById("invoiceItems").innerHTML = "";
  document.getElementById("totalAmount").innerText = "0";
}
