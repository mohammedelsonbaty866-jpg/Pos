let cart = [];

function addToCart(product) {
  const item = cart.find(i => i.id === product.id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function renderCart() {
  const tbody = document.getElementById("cartItems");
  const totalSpan = document.getElementById("totalPrice");
  tbody.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.qty}</td>
        <td><button onclick="removeItem(${item.id})">❌</button></td>
      </tr>
    `;
  });

  totalSpan.innerText = total;
}

function checkout() {
  if (cart.length === 0) return alert("الفاتورة فاضية");

  const sales = JSON.parse(localStorage.getItem("pos_sales"));
  sales.push({
    date: new Date().toLocaleString(),
    items: cart
  });

  localStorage.setItem("pos_sales", JSON.stringify(sales));
  cart = [];
  renderCart();
  alert("تم التحصيل بنجاح ✅");
}
