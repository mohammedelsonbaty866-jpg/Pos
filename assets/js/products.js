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

/* ===== إضافة صنف ===== */
function addProduct(name, price, barcode = "") {
  const products = loadProducts();

  const exists = products.find(
    p => p.name === name || (barcode && p.barcode === barcode)
  );
  if (exists) {
    alert("❌ الصنف موجود بالفعل");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price: Number(price),
    barcode
  });

  saveProducts(products);
  renderProducts();
}

/* ===== حذف صنف ===== */
function deleteProduct(id) {
  let products = loadProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderProducts();
}

/* ===== البحث ===== */
function searchProducts(query) {
  const products = loadProducts();
  query = query.toLowerCase();

  return products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    (p.barcode && p.barcode.includes(query))
  );
}

/* ===== عرض الأصناف ===== */
function renderProducts(list = null) {
  const table = document.getElementById("productsTable");
  if (!table) return;

  const products = list || loadProducts();
  table.innerHTML = "";

  products.forEach(p => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price.toFixed(2)}</td>
      <td>${p.barcode || "-"}</td>
      <td>
        <button onclick="deleteProduct(${p.id})">🗑 حذف</button>
      </td>
    `;

    table.appendChild(row);
  });
}

/* ===== أحداث الصفحة ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const form = document.getElementById("addProductForm");
  const searchInput = document.getElementById("searchProduct");

  /* إضافة صنف */
  form?.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value;
    const barcode = document.getElementById("productBarcode").value.trim();

    if (!name || !price) {
      alert("⚠️ أدخل اسم وسعر الصنف");
      return;
    }

    addProduct(name, price, barcode);
    form.reset();
  });

  /* البحث */
  searchInput?.addEventListener("input", e => {
    const result = searchProducts(e.target.value);
    renderProducts(result);
  });
});
