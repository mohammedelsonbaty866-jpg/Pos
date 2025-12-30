function searchProduct(v){
  const res=products.filter(p=>p.name.includes(v)||p.barcode===v);
  renderProducts(res);
}
