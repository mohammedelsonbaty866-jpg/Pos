rep.innerHTML = "";
invoices.forEach((inv,i)=>{
  rep.innerHTML += `
    <tr>
      <td>${i+1}</td>
      <td>${inv.date}</td>
      <td>${inv.items.length}</td>
      <td>${inv.total} ج</td>
    </tr>
  `;
});
