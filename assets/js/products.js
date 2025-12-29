const grid=document.getElementById("productsGrid");
const search=document.getElementById("search");

function renderProducts(list=products){
  grid.innerHTML="";
  list.forEach(p=>{
    const d=document.createElement("div");
    d.className="product";
    d.innerText=`${p.name}\n${p.price} ج`;
    d.onclick=()=>addToCart(p);
    grid.appendChild(d);
  });
}

search?.addEventListener("input",e=>{
  const q=e.target.value;
  renderProducts(products.filter(p=>p.name.includes(q)||p.barcode===q));
});

renderProducts();
