let videoStream = null;

function startBarcodeScanner() {
  if (!navigator.mediaDevices) {
    alert("الكاميرا غير مدعومة");
    return;
  }

  const video = document.createElement("video");
  video.setAttribute("playsinline", true);
  video.style.width = "100%";

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "#000";
  overlay.style.zIndex = "9999";
  overlay.appendChild(video);

  document.body.appendChild(overlay);

  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  }).then(stream => {
    videoStream = stream;
    video.srcObject = stream;
    video.play();

    const detector = new BarcodeDetector({
      formats: ["ean_13", "code_128", "qr_code"]
    });

    const scan = async () => {
      if (!videoStream) return;

      const codes = await detector.detect(video);
      if (codes.length > 0) {
        const code = codes[0].rawValue;
        stopScanner(overlay);
        playBeep();
        findProductByBarcode(code);
        return;
      }
      requestAnimationFrame(scan);
    };
    scan();
  }).catch(() => {
    alert("لم يتم السماح بالكاميرا");
    stopScanner(overlay);
  });
}

function stopScanner(overlay) {
  if (videoStream) {
    videoStream.getTracks().forEach(t => t.stop());
    videoStream = null;
  }
  overlay.remove();
}

function playBeep() {
  const audio = new Audio("assets/sounds/beep.mp3");
  audio.play();
}

function findProductByBarcode(code) {
  const product = products.find(p => p.barcode === code);
  if (!product) {
    alert("الصنف غير موجود");
    return;
  }
  addToCart(product);
}
