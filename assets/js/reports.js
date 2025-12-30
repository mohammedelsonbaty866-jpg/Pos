/* ===============================
   REPORTS.JS | POS SUPER PRO
================================ */

document.addEventListener("DOMContentLoaded", loadReports);

function loadReports() {
  const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

  const table = document.getElementById("reportsTable");
  const totalInvoices = document.getElementById("totalInvoices");
  const totalSales = document.getElementById("totalSales");
  const totalItems = document.getElementById("totalItems");

  let salesSum = 0;
  let itemsSum = 0;

  table.innerHTML = "";

  invoices.forEach((inv, index) => {
    salesSum += inv.total;
    itemsSum += inv.items.length;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${new Date(inv.date).toLocaleString()}</td>
      <td>${inv.total} ج</td>
      <td>${inv.items.length}</td>
    `;
    table.appendChild(row);
  });

  totalInvoices.innerText = invoices.length;
  totalSales.innerText = salesSum + " ج";
  totalItems.innerText = itemsSum;
}

/* ===============================
   NAVIGATION
================================ */
function goCashier() {
  window.location.href = "../index.html";
}
