/********************************
 * PRODUCTS MANAGEMENT - POS PRO
 ********************************/

// تحميل الأصناف عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
  renderProductsTable();
});

/* ==============================
   جلب الأصناف من LocalStorage
================================ */
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

/* ==============================
   حفظ الأصناف
================================ */
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

/* ==============================
   إضافة صنف
================================ */
function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const barcode = document.getElementById("productBarcode").value.trim();
  const stock = parseInt(document.getElementById("productStock").value) || 0;

  if (!name || isNaN(price)) {
    alert("من فضلك أدخل اسم وسعر الصنف");
    return;
  }

  const products = getProducts();

  // منع تكرار الباركود
  if (barcode && products.find(p => p.barcode === barcode)) {
    alert("الباركود مستخدم بالفعل");
    return;
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
    barcode,
    stock
  };

  products.push(newProduct);
  saveProducts(products);

  clearProductForm();
  renderProductsTable();
}

/* ==============================
   مسح النموذج
================================ */
function clearProductForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productBarcode").value = "";
  document.getElementById("productStock").value = "1";
}

/* ==============================
   عرض جدول الأصناف
================================ */
function renderProductsTable(filteredList = null) {
  const table = document.getElementById("productsTable");
  if (!table) return;

  const products = filteredList || getProducts();
  table.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>${product.barcode || "-"}</td>
      <td>${product.stock}</td>
      <td>
        <button class="btn-danger" onclick="deleteProduct(${product.id})">
          حذف
        </button>
      </td>
    `;

    table.appendChild(row);
  });
}

/* ==============================
   حذف صنف
================================ */
function deleteProduct(id) {
  if (!confirm("هل أنت متأكد من حذف الصنف؟")) return;

  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);

  renderProductsTable();
}

/* ==============================
   البحث
================================ */
function searchProducts(query) {
  query = query.trim().toLowerCase();
  const products = getProducts();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    (p.barcode && p.barcode.includes(query))
  );

  renderProductsTable(filtered);
}
