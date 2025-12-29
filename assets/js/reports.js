document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("reportsContainer");
  if (!container) return;

  const invoices = JSON.parse(localStorage.invoices || "[]");

  if (invoices.length === 0) {
    container.innerHTML = "<p>لا توجد تقارير بعد</p>";
    return;
  }

  let totalSales = 0;

  invoices.forEach((inv, i) => {
    totalSales += Number(inv.total);

    const div = document.createElement("div");
    div.className = "report-card";
    div.innerHTML = `
      <strong>فاتورة #${i + 1}</strong><br>
      التاريخ: ${inv.date}<br>
      عدد الأصناف: ${inv.items.length}<br>
      الإجمالي: ${inv.total} ج
    `;
    container.appendChild(div);
  });

  const summary = document.createElement("h2");
  summary.innerText = `إجمالي المبيعات: ${totalSales} ج`;
  container.prepend(summary);
});
