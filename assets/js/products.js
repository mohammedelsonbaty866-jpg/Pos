const table=document.getElementById("productsTable");

function renderTable(){
  table.innerHTML="";
  products.forEach((p,i)=>{
    table.innerHTML+=`
    <tr>
      <td>${i+1}</td>
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>${p.barcode}</td>
      <td><button onclick="del(${i})">❌</button></td>
    </tr>`;
  });
  localStorage.setItem("products",JSON.stringify(products));
}
renderTable();

function addProduct(){
  products.push({
    id:Date.now(),
    name:pName.value,
    price:+pPrice.value,
    barcode:pBarcode.value
  });
  renderTable();
}

function del(i){
  products.splice(i,1);
  renderTable();
}
