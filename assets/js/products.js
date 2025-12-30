/*************************************************
 * PRODUCTS SYSTEM - POS SUPER PRO
 *************************************************/

const PRODUCTS_KEY = "pos_products";

/* ===== تحميل الأصناف ===== */
function loadProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

/* ===== حفظ الأصناف ===== */
function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

/* ===== عناصر الصفحة ===== */
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productBarcodeInput = document.getElementById("productBarcode");
const productsTable = document.getElementById("productsTable");

/* ===== إضافة صنف ===== */
function addProduct() {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);
  const barcode = productBarcodeInput.value.trim();

  if (!name || isNaN(price)) {
    alert("❌ أدخل اسم وسعر الصنف");
    return;
  }

  const products = loadProducts();

  products.push({
    id: Date.now(),
    name,
    price,
    barcode
  });

  saveProducts(products);
  renderProducts();

  productNameInput.value = "";
  productPriceInput.value = "";
  productBarcodeInput.value = "";
}

/* ===== عرض الأصناف ===== */
function renderProducts(filter = "") {
  const products = loadProducts();
  productsTable.innerHTML = "";

  products
    .filter(p =>
      p.name.includes(filter) ||
      (p.barcode && p.barcode.includes(filter))
    )
    .forEach((product, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.barcode || "-"}</td>
        <td>
          <button onclick="deleteProduct(${product.id})">❌</button>
        </td>
      `;

      productsTable.appendChild(tr);
    });
}

/* ===== حذف صنف ===== */
function deleteProduct(id) {
  let products = loadProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderProducts();
}

/* ===== البحث ===== */
function searchProduct(value) {
  renderProducts(value);
}

/* ===== تشغيل تلقائي ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
