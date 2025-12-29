function login() {
  const u = username.value;
  const p = password.value;

  const users = JSON.parse(localStorage.users || "[]");
  const user = users.find(x => x.u === u && x.p === p);

  if (!user) {
    msg.innerText = "بيانات غير صحيحة";
    return;
  }

  localStorage.session = JSON.stringify(user);
  location.href = "index.html";
}

function register() {
  const u = username.value;
  const p = password.value;

  if (!u || !p) return;

  const users = JSON.parse(localStorage.users || "[]");
  users.push({ u, p });
  localStorage.users = JSON.stringify(users);

  msg.innerText = "تم إنشاء الحساب – سجل دخول";
}
