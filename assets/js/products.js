/*************************************************
 * PRODUCTS MANAGEMENT - POS PRO
 *************************************************/

let products = JSON.parse(localStorage.getItem("products")) || [];

/* ===== حفظ الأصناف ===== */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* ===== إضافة صنف ===== */
function addProduct() {
  const nameInput = document.getElementById("productName");
  const priceInput = document.getElementById("productPrice");
  const barcodeInput = document.getElementById("productBarcode");

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const barcode = barcodeInput.value.trim();

  if (!name || isNaN(price)) {
    alert("من فضلك أدخل اسم الصنف والسعر");
    return;
  }

  // منع تكرار الباركود
  if (barcode && products.some(p => p.barcode === barcode)) {
    alert("الباركود مستخدم بالفعل");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price,
    barcode
  };

  products.push(product);
  saveProducts();
  renderProducts();

  nameInput.value = "";
  priceInput.value = "";
  barcodeInput.value = "";
}

/* ===== عرض الأصناف ===== */
function renderProducts(filtered = null) {
  const table = document.getElementById("productsTable");
  if (!table) return;

  const list = filtered || products;
  table.innerHTML = "";

  list.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>${product.barcode || "-"}</td>
      <td>
        <button class="btn-danger" onclick="deleteProduct(${product.id})">
          حذف
        </button>
      </td>
    `;

    table.appendChild(row);
  });
}

/* ===== حذف صنف ===== */
function deleteProduct(id) {
  if (!confirm("هل أنت متأكد من حذف الصنف؟")) return;

  products = products.filter(p => p.id !== id);
  saveProducts();
  renderProducts();
}

/* ===== بحث ===== */
function searchProducts(keyword) {
  keyword = keyword.trim().toLowerCase();

  if (!keyword) {
    renderProducts();
    return;
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    (p.barcode && p.barcode.includes(keyword))
  );

  renderProducts(filtered);
}

/* ===== تحميل تلقائي ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
