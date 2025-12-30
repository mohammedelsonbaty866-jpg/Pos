const grid=document.getElementById("productsGrid");
const items=document.getElementById("invoiceItems");
const totalBox=document.getElementById("total");

let cart=[];

function renderProducts(list=products){
  grid.innerHTML="";
  list.forEach(p=>{
    const d=document.createElement("div");
    d.className="product";
    d.innerHTML=`${p.name}<br>${p.price} ج`;
    d.onclick=()=>addToCart(p);
    grid.appendChild(d);
  });
}
renderProducts();

function addToCart(p){
  playBeep();
  cart.push(p);
  renderInvoice();
}

function renderInvoice(){
  items.innerHTML="";
  let total=0;
  cart.forEach((i,idx)=>{
    total+=i.price;
    items.innerHTML+=`
      <div class="invoice-item">
        <span>${i.name}</span>
        <span>${i.price}</span>
      </div>`;
  });
  totalBox.innerText=total+" ج";
}

function saveInvoice(){
  alert("تم حفظ الفاتورة ✔");
  cart=[];
  renderInvoice();
}

function clearInvoice(){
  cart=[];
  renderInvoice();
}

function searchProduct(val){
  const v=val.toLowerCase();
  const filtered=products.filter(p=>
    p.name.toLowerCase().includes(v) ||
    (p.barcode && p.barcode.includes(v))
  );
  renderProducts(filtered);
}
