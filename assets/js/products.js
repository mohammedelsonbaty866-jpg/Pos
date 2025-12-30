const STORAGE_KEY = "pos_products";

// تحميل الأصناف
function loadProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// حفظ الأصناف
function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// إضافة صنف
function addProduct() {
  const name = document.getElementById("pName").value.trim();
  const price = document.getElementById("pPrice").value;
  const barcode = document.getElementById("pBarcode").value.trim();

  if (!name || !price) {
    alert("أدخل اسم الصنف والسعر");
    return;
  }

  const products = loadProducts();

  products.push({
    id: Date.now(),
    name,
    price: Number(price),
    barcode
  });

  saveProducts(products);

  document.getElementById("pName").value = "";
  document.getElementById("pPrice").value = "";
  document.getElementById("pBarcode").value = "";

  renderProducts();
}

// عرض الأصناف
function renderProducts() {
  const list = document.getElementById("productsList");
  const products = loadProducts();

  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML = "<p>لا يوجد أصناف</p>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-row";
    div.innerHTML = `
      <span>${p.name}</span>
      <span>${p.price} ج</span>
      <button onclick="deleteProduct(${p.id})">🗑️</button>
    `;
    list.appendChild(div);
  });
}

// حذف صنف
function deleteProduct(id) {
  let products = loadProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderProducts();
}

// رجوع للكاشير
function goCashier() {
  window.location.href = "../index.html";
}

// تحميل تلقائي
renderProducts();
