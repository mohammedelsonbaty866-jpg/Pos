const DB_PRODUCTS = "pos_products";
const DB_SALES = "pos_sales";

if (!localStorage.getItem(DB_PRODUCTS)) {
  localStorage.setItem(DB_PRODUCTS, JSON.stringify([
    { id: 1, name: "مياه", price: 5 },
    { id: 2, name: "بيبسي", price: 10 },
    { id: 3, name: "شيبسي", price: 7 }
  ]));
}

if (!localStorage.getItem(DB_SALES)) {
  localStorage.setItem(DB_SALES, JSON.stringify([]));
}
