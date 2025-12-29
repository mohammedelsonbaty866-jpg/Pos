document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("toggleTheme");

  if (localStorage.theme === "dark") {
    document.body.classList.add("dark");
  }

  themeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.theme =
      document.body.classList.contains("dark") ? "dark" : "light";
  });
});
