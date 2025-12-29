function renderProducts(){
  productsGrid.innerHTML="";
  products.forEach(p=>{
    const d=document.createElement("div");
    d.innerText = p.name+" - "+p.price+"ج";
    d.onclick=()=>addToInvoice(p);
    productsGrid.appendChild(d);
  });
}
