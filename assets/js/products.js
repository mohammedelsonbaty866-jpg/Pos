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
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

function renderProducts(filter = "") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const products = getProducts();
  grid.innerHTML = "";

  const filtered = products.filter(p =>
    p.name.includes(filter) || p.barcode.includes(filter)
  );

  if (filtered.length === 0) {
    grid.innerHTML = "<p class='empty'>لا توجد أصناف</p>";
    return;
  }

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <strong>${product.name}</strong>
      <span>${product.price} ج</span>
    `;
    div.onclick = () => addToInvoice(product);
    grid.appendChild(div);
  });
}

function searchProducts(value) {
  renderProducts(value);
}
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid");

  if (!grid) {
    alert("productsGrid مش موجود");
    return;
  }

  grid.innerHTML = `
    <div style="padding:10px;border:1px solid #ccc">منتج 1</div>
    <div style="padding:10px;border:1px solid #ccc">منتج 2</div>
  `;
});
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

function loadProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) {
    console.error("productsGrid not found");
    return;
  }

  const products = JSON.parse(localStorage.getItem("pos_products")) || [];

  grid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <strong>${product.name}</strong>
      <span>${product.price} ج</span>
    `;
    card.onclick = () => addToInvoice(product);
    grid.appendChild(card);
  });
}
