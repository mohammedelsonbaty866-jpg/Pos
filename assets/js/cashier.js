const grid=document.getElementById("productsGrid");
const invoiceBox=document.getElementById("invoiceItems");
const totalBox=document.getElementById("total");

function renderProducts(list=products){
  grid.innerHTML="";
  list.forEach(p=>{
    const d=document.createElement("div");
    d.className="product";
    d.innerText=p.name+" - "+p.price+"ج";
    d.onclick=()=>addToInvoice(p);
    grid.appendChild(d);
  });
}
renderProducts();

function addToInvoice(p){
  invoice.push(p);
  renderInvoice();
}

function renderInvoice(){
  invoiceBox.innerHTML="";
  let t=0;
  invoice.forEach(i=>{
    t+=i.price;
    invoiceBox.innerHTML+=`<div>${i.name} - ${i.price}ج</div>`;
  });
  totalBox.innerText=t+" ج";
}

function clearInvoice(){
  invoice=[];
  renderInvoice();
}

function saveInvoice(){
  alert("تم حفظ الفاتورة");
}
