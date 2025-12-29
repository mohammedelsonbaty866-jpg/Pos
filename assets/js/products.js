function renderProducts(list = products) {
  productsGrid.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerText = `${p.name} - ${p.price}ج`;
    div.onclick = () => addToInvoice(p);
    productsGrid.appendChild(div);
  });
}

function searchProduct(q) {
  q = q.toLowerCase();
  renderProducts(
    products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.barcode || "").includes(q)
    )
  );
}

renderProducts();
