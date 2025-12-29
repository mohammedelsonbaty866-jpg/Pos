let cart=[];

function addToInvoice(p){
  cart.push(p);
  renderInvoice();
}

function renderInvoice(){
  invoiceItems.innerHTML="";
  let t=0;
  cart.forEach(i=>{
    t+=i.price;
    invoiceItems.innerHTML+=`<div>${i.name} - ${i.price}</div>`;
  });
  total.innerText=t+" ج";
}

function saveInvoice(){
  invoices.push({
    date:new Date().toLocaleString(),
    total: total.innerText,
    items: cart
  });
  saveAll();
  cart=[];
  renderInvoice();
}
