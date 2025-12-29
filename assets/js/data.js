let products = JSON.parse(localStorage.products||"[]");
let invoices = JSON.parse(localStorage.invoices||"[]");

function saveAll(){
  localStorage.products = JSON.stringify(products);
  localStorage.invoices = JSON.stringify(invoices);
}
