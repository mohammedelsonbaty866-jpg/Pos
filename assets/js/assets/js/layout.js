document.addEventListener("DOMContentLoaded", () => {
  const header = `
    <header class="top-bar">
      <div class="logo">POS Pro</div>
      <nav class="main-nav">
        <a href="/index.html">الكاشير</a>
        <a href="/pages/products.html">الأصناف</a>
        <a href="/pages/reports.html">التقارير</a>
        <a href="/pages/settings.html">الإعدادات</a>
        <button onclick="toggleTheme()" class="btn-primary">🌙</button>
      </nav>
    </header>
  `;
  document.body.insertAdjacentHTML("afterbegin", header);
});
