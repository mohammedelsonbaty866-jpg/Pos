let codeReader;
let streamActive = false;

function startBarcode() {
  document.getElementById("barcodeModal").style.display = "flex";

  codeReader = new ZXing.BrowserMultiFormatReader();

  codeReader.decodeFromVideoDevice(
    null,
    "camera",
    (result, err) => {
      if (result && !streamActive) {
        streamActive = true;

        document.getElementById("beep").play();

        const barcode = result.text;
        const product = products.find(p => p.barcode == barcode);

        if (product) {
          addToCart(product);
        } else {
          alert("❌ المنتج غير موجود");
        }

        stopBarcode();
      }
    }
  );
}

function stopBarcode() {
  document.getElementById("barcodeModal").style.display = "none";

  if (codeReader) {
    codeReader.reset();
  }

  streamActive = false;
}
