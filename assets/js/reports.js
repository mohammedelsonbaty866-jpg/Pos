/********************************
 * REPORTS LOGIC - POS PRO
 ********************************/

/* ==============================
   جلب الفواتير
================================ */
function getInvoices() {
  return JSON.parse(localStorage.getItem("invoices")) || [];
}

/* ==============================
   تقرير إجمالي
================================ */
function totalReport() {
  const invoices = getInvoices();

  let totalSales = 0;
  let totalInvoices = invoices.length;

  invoices.forEach(inv => {
    totalSales += inv.total;
  });

  renderReport(`
    <h3>📊 تقرير إجمالي</h3>
    <p>عدد الفواتير: <strong>${totalInvoices}</strong></p>
    <p>إجمالي المبيعات: <strong>${totalSales.toFixed(2)} ج</strong></p>
  `);
}

/* ==============================
   تقرير اليوم
================================ */
function dailyReport() {
  const invoices = getInvoices();
  const today = new Date().toLocaleDateString();

  let total = 0;
  let count = 0;

  invoices.forEach(inv => {
    if (inv.date.includes(today)) {
      total += inv.total;
      count++;
    }
  });

  renderReport(`
    <h3>📅 تقرير اليوم</h3>
    <p>عدد الفواتير: <strong>${count}</strong></p>
    <p>مبيعات اليوم: <strong>${total.toFixed(2)} ج</strong></p>
  `);
}

/* ==============================
   تقرير مفصل
================================ */
function detailedReport() {
  const invoices = getInvoices();

  let html = `
    <h3>📋 تقرير تفصيلي</h3>
    <table class="report-table">
      <tr>
        <th>رقم</th>
        <th>التاريخ</th>
        <th>الإجمالي</th>
      </tr>
  `;

  invoices.forEach((inv, i) => {
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${inv.date}</td>
        <td>${inv.total.toFixed(2)} ج</td>
      </tr>
    `;
  });

  html += `</table>`;

  renderReport(html);
}

/* ==============================
   عرض التقرير
================================ */
function renderReport(content) {
  const box = document.getElementById("reportBox");
  if (!box) return;
  box.innerHTML = content;
}

/* ==============================
   مسح كل التقارير (اختياري)
================================ */
function clearReports() {
  if (!confirm("هل أنت متأكد من مسح كل التقارير؟")) return;
  localStorage.removeItem("invoices");
  renderReport("<p>تم مسح جميع التقارير</p>");
}
