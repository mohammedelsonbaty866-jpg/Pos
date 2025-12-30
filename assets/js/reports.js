/********************************
 * REPORTS MODULE - POS SUPER PRO
 ********************************/

/* ==============================
   تحميل التقارير
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadReports();
});

/* ==============================
   تحميل كل المبيعات
================================ */
function loadReports() {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];

  renderSummary(sales);
  renderSalesTable(sales);
}

/* ==============================
   ملخص التقارير
================================ */
function renderSummary(sales) {
  const totalSalesEl = document.getElementById("totalSales");
  const totalInvoicesEl = document.getElementById("totalInvoices");
  const totalItemsEl = document.getElementById("totalItems");

  let totalAmount = 0;
  let totalItems = 0;

  sales.forEach(sale => {
    totalAmount += sale.total;
    sale.items.forEach(i => {
      totalItems += i.qty;
    });
  });

  if (totalSalesEl) totalSalesEl.textContent = totalAmount.toFixed(2) + " ج";
  if (totalInvoicesEl) totalInvoicesEl.textContent = sales.length;
  if (totalItemsEl) totalItemsEl.textContent = totalItems;
}

/* ==============================
   جدول الفواتير
================================ */
function renderSalesTable(sales) {
  const table = document.getElementById("reportsTable");
  if (!table) return;

  table.innerHTML = "";

  sales.forEach((sale, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${sale.date}</td>
        <td>${sale.items.length}</td>
        <td>${sale.total.toFixed(2)} ج</td>
        <td>
          <button onclick="viewInvoice(${sale.id})">
            👁 عرض
          </button>
        </td>
      </tr>
    `;
  });
}

/* ==============================
   عرض فاتورة
================================ */
function viewInvoice(id) {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const sale = sales.find(s => s.id === id);
  if (!sale) return;

  let text = "🧾 تفاصيل الفاتورة\n\n";

  sale.items.forEach(item => {
    text += `${item.name} × ${item.qty} = ${item.qty * item.price} ج\n`;
  });

  text += `\nالإجمالي: ${sale.total} ج`;

  alert(text);
}

/* ==============================
   مسح التقارير
================================ */
function clearReports() {
  if (!confirm("⚠️ هل أنت متأكد من مسح كل التقارير؟")) return;

  localStorage.removeItem("sales");
  loadReports();
  alert("✅ تم مسح التقارير");
}
