// ===============================
// BARCODE SCANNER - CAMERA MODE
// POS SUPER PRO
// ===============================

let scannerActive = false;
let videoStream = null;

// فتح الكاميرا
async function openBarcodeScanner() {
  if (scannerActive) return;
  scannerActive = true;

  const video = document.getElementById("barcodeVideo");
  const overlay = document.getElementById("barcodeOverlay");

  overlay.style.display = "flex";

  try {
    videoStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false
    });

    video.srcObject = videoStream;
    video.setAttribute("playsinline", true);
    video.play();

    scanFrame(video);
  } catch (err) {
    alert("لا يمكن فتح الكاميرا");
    closeScanner();
  }
}

// إغلاق الكاميرا
function closeScanner() {
  scannerActive = false;

  const overlay = document.getElementById("barcodeOverlay");
  const video = document.getElementById("barcodeVideo");

  overlay.style.display = "none";

  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoStream = null;
  }
}

// قراءة الفريم
function scanFrame(video) {
  if (!scannerActive) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const code = jsQR(imageData.data, canvas.width, canvas.height);

  if (code) {
    handleBarcode(code.data);
    closeScanner();
    return;
  }

  requestAnimationFrame(() => scanFrame(video));
}

// التعامل مع الباركود
function handleBarcode(barcode) {
  const product = products.find(p => p.barcode === barcode);

  if (product) {
    addToInvoice(product.id);
  } else {
    alert("الصنف غير موجود");
  }
}
