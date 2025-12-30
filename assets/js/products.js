let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const barcode = document.getElementById("barcode").value.trim();

  if (!name || !price) {
    alert("❌ أدخل اسم وسعر الصنف");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price,
    barcode
  });

  localStorage.setItem("products", JSON.stringify(products));

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("barcode").value = "";

  renderProducts();
}

function renderProducts() {
  const table = document.getElementById("productsTable");
  const search = document.getElementById("search").value.toLowerCase();

  table.innerHTML = "";

  products
    .filter(p =>
      p.name.toLowerCase().includes(search) ||
      (p.barcode && p.barcode.includes(search))
    )
    .forEach((p, index) => {
      table.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td>${p.barcode || "-"}</td>
          <td>
            <button class="delete" onclick="deleteProduct(${p.id})">🗑</button>
          </td>
        </tr>
      `;
    });
}

function deleteProduct(id) {
  if (!confirm("هل أنت متأكد من الحذف؟")) return;

  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function goBack() {
  window.location.href = "../index.html";
}

renderProducts();
