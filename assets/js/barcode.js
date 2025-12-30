let stream = null;

function startBarcode() {
  const modal = document.getElementById("barcodeModal");
  const video = document.getElementById("camera");
  modal.style.display = "flex";

  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  }).then(s => {
    stream = s;
    video.srcObject = stream;
  });
}

function stopBarcode() {
  document.getElementById("barcodeModal").style.display = "none";
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }
}

// محاكاة قراءة باركود (قابل للربط الحقيقي لاحقًا)
setInterval(() => {
  if (document.getElementById("barcodeModal").style.display === "flex") {
    // مثال باركود = ID المنتج
    const fakeBarcode = 1;
    const product = products.find(p => p.id === fakeBarcode);
    if (product) {
      addToCart(product);
      stopBarcode();
    }
  }
}, 3000);
