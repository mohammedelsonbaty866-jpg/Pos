function addToCart(p){
  cart.push(p);
  renderInvoice();
}

function renderInvoice(){
  invoiceItems.innerHTML="";
  let totalPrice=0;
  cart.forEach(i=>{
    totalPrice+=i.price;
    invoiceItems.innerHTML+=`<div>${i.name} - ${i.price}</div>`;
  });
  total.innerText=totalPrice;
}

function saveInvoice(){
  invoices.push({date:new Date().toLocaleString(),items:cart,total:total.innerText});
  cart=[];
  saveAll();
  renderInvoice();
  alert("تم حفظ الفاتورة");
}

function clearInvoice(){
  cart=[];
  renderInvoice();
}
