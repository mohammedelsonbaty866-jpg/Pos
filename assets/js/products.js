/*************************************************
 * POS Super Pro - Products Module
 * Path: /assets/js/products.js
 *************************************************/

/* ========= Storage Keys ========= */
const PRODUCTS_KEY = "pos_products";

/* ========= Helpers ========= */
function getProducts() {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

/* ========= Render Products Table ========= */
function renderProductsTable() {
  const tableBody = document.getElementById("productsTable");
  if (!tableBody) return;

  const products = getProducts();
  tableBody.innerHTML = "";

  if (products.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; opacity:.6">
          لا توجد أصناف
        </td>
      </tr>
    `;
    return;
  }

  products.forEach((product, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price} ج</td>
      <td>${product.barcode || "-"}</td>
      <td>
        <button class="danger-btn" onclick="deleteProduct(${index})">
          🗑
        </button>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

/* ========= Add Product ========= */
function addProduct(event) {
  event.preventDefault();

  const nameInput = document.getElementById("productName");
  const priceInput = document.getElementById("productPrice");
  const barcodeInput = document.getElementById("productBarcode");

  if (!nameInput || !priceInput) return;

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const barcode = barcodeInput.value.trim();

  if (!name || isNaN(price)) {
    alert("من فضلك أدخل اسم وسعر صحيح");
    return;
  }

  const products = getProducts();

  // منع تكرار الباركود
  if (barcode) {
    const exists = products.some(p => p.barcode === barcode);
    if (exists) {
      alert("الباركود موجود بالفعل");
      return;
    }
  }

  products.push({
    name,
    price,
    barcode
  });

  saveProducts(products);

  nameInput.value = "";
  priceInput.value = "";
  barcodeInput.value = "";

  renderProductsTable();
}

/* ========= Delete Product ========= */
function deleteProduct(index) {
  if (!confirm("هل تريد حذف الصنف؟")) return;

  const products = getProducts();
  products.splice(index, 1);
  saveProducts(products);
  renderProductsTable();
}

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  if (form) {
    form.addEventListener("submit", addProduct);
  }

  renderProductsTable();
});
