/********************************
 * PRODUCTS MODULE - POS SUPER PRO
 ********************************/

/* ==============================
   تحميل الأصناف
================================ */
let products = JSON.parse(localStorage.getItem("products")) || [];

/* ==============================
   حفظ الأصناف
================================ */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* ==============================
   إضافة صنف جديد
================================ */
function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const barcode = document.getElementById("productBarcode").value.trim();

  if (!name || isNaN(price)) {
    alert("❌ من فضلك أدخل اسم وسعر الصنف");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price,
    barcode: barcode || null
  };

  products.push(product);
  saveProducts();
  renderProductsTable();
  renderProductsGrid();

  // تفريغ الحقول
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productBarcode").value = "";

  alert("✅ تم إضافة الصنف");
}

/* ==============================
   حذف صنف
================================ */
function deleteProduct(id) {
  if (!confirm("هل أنت متأكد من حذف الصنف؟")) return;

  products = products.filter(p => p.id !== id);
  saveProducts();
  renderProductsTable();
  renderProductsGrid();
}

/* ==============================
   عرض الأصناف في جدول
================================ */
function renderProductsTable() {
  const table = document.getElementById("productsTable");
  if (!table) return;

  table.innerHTML = "";

  products.forEach((p, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${p.name}</td>
        <td>${p.price} ج</td>
        <td>
          <button onclick="deleteProduct(${p.id})">🗑</button>
        </td>
      </tr>
    `;
  });
}

/* ==============================
   عرض الأصناف في شاشة الكاشير
================================ */
function renderProductsGrid() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <strong>${p.name}</strong>
      <span>${p.price} ج</span>
    `;
    div.onclick = () => addToInvoice(p);
    grid.appendChild(div);
  });
}

/* ==============================
   البحث بالاسم أو الباركود
================================ */
function searchProduct(value) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const keyword = value.toLowerCase();
  grid.innerHTML = "";

  products
    .filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      (p.barcode && p.barcode.includes(keyword))
    )
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <strong>${p.name}</strong>
        <span>${p.price} ج</span>
      `;
      div.onclick = () => addToInvoice(p);
      grid.appendChild(div);
    });
}

/* ==============================
   تحميل تلقائي
================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderProductsTable();
  renderProductsGrid();
});
