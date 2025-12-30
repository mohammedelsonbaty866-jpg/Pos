/*************************************************
 * REPORTS SYSTEM - POS SUPER PRO
 *************************************************/

/* ===== عناصر الصفحة ===== */
const reportContainer = document.getElementById("reportsContainer");

/* ===== تحميل الفواتير ===== */
function getInvoices() {
  return JSON.parse(localStorage.getItem("invoices")) || [];
}

/* ===== تقرير اليوم ===== */
function dailyReport() {
  const invoices = getInvoices();
  const today = new Date().toLocaleDateString("ar-EG");

  const dailyInvoices = invoices.filter(inv =>
    inv.date.includes(today)
  );

  renderReport(dailyInvoices, "تقرير اليوم");
}

/* ===== تقرير شهري ===== */
function monthlyReport() {
  const invoices = getInvoices();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const monthlyInvoices = invoices.filter(inv => {
    const d = new Date(inv.id);
    return d.getMonth() + 1 === month && d.getFullYear() === year;
  });

  renderReport(monthlyInvoices, "تقرير الشهر");
}

/* ===== تقرير كامل ===== */
function allReports() {
  const invoices = getInvoices();
  renderReport(invoices, "كل التقارير");
}

/* ===== عرض التقرير ===== */
function renderReport(invoices, title) {
  if (!reportContainer) return;

  reportContainer.innerHTML = `
    <h2>${title}</h2>
  `;

  if (invoices.length === 0) {
    reportContainer.innerHTML += `<p>لا توجد بيانات</p>`;
    return;
  }

  let totalSales = 0;

  invoices.forEach((inv, index) => {
    const total = parseFloat(inv.total);
    totalSales += total;

    const box = document.createElement("div");
    box.className = "report-card";
    box.innerHTML = `
      <strong>فاتورة #${index + 1}</strong>
      <div>التاريخ: ${inv.date}</div>
      <div>الإجمالي: ${total.toFixed(2)} ج</div>
    `;
    reportContainer.appendChild(box);
  });

  reportContainer.innerHTML += `
    <hr>
    <h3>إجمالي المبيعات: ${totalSales.toFixed(2)} ج</h3>
  `;
}

/* ===== عند تحميل الصفحة ===== */
document.addEventListener("DOMContentLoaded", () => {
  allReports();
});
