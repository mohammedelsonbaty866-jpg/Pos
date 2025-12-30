// ===============================
// PRODUCTS.JS - POS SUPER PRO
// ===============================

let products = loadProducts();

// عرض المنتجات في شاشة الكاشير
function renderProducts(list = products) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  list.forEach(product => {
    const btn = document.createElement("button");
    btn.className = "product-btn";
    btn.innerText = `${product.name}\n${product.price} ج`;

    btn.onclick = () => addToInvoice(product.id);

    grid.appendChild(btn);
  });
}

// البحث بالاسم
function searchProduct(keyword) {
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword.toLowerCase()) ||
    (p.barcode && p.barcode.includes(keyword))
  );
  renderProducts(filtered);
}

// إضافة منتج جديد (من صفحة الأصناف)
function addProduct(name, price, barcode = "") {
  const product = {
    id: generateID(),
    name,
    price: Number(price),
    barcode
  };

  products.push(product);
  saveProducts(products);
  renderProducts();
}

// تحميل المنتجات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
