const productList = document.getElementById("productList");
const products = JSON.parse(localStorage.getItem("pos_products"));

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `<strong>${p.name}</strong><br>${p.price} جنيه`;
  div.onclick = () => addToCart(p);
  productList.appendChild(div);
});
