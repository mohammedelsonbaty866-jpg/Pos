const beep = new Audio("../assets/sounds/beep.mp3");
function barcodeScan(code){
  const p = products.find(x=>x.barcode==code);
  if(p){
    beep.play();
    addToInvoice(p);
  }
}
