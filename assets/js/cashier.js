let cart = [];

function addToInvoice(p) {
  cart.push(p);
  renderInvoice();
}

function renderInvoice() {
  invoiceItems.innerHTML = "";
  let total = 0;

  cart.forEach(p => {
    total += p.price;
    invoiceItems.innerHTML += `<div>${p.name} - ${p.price}ج</div>`;
  });

  document.getElementById("total").innerText = total;
}

function clearInvoice() {
  cart = [];
  renderInvoice();
}

function saveInvoice() {
  invoices.push({
    date: new Date().toLocaleString(),
    items: cart,
    total: cart.reduce((s,p)=>s+p.price,0)
  });
  saveAll();
  clearInvoice();
  alert("تم حفظ الفاتورة");
}
