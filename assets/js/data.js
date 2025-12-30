// ===============================
// DATA.JS - POS SUPER PRO
// ===============================

// مفاتيح التخزين
const PRODUCTS_KEY = "pos_products";
const INVOICES_KEY = "pos_invoices";

// تحميل المنتجات
function loadProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

// حفظ المنتجات
function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// تحميل الفواتير
function loadInvoices() {
  return JSON.parse(localStorage.getItem(INVOICES_KEY)) || [];
}

// حفظ الفواتير
function saveInvoices(invoices) {
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

// إنشاء ID فريد
function generateID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
const products = [
  { id: 1, name: "مياه", price: 5 },
  { id: 2, name: "عصير", price: 10 },
  { id: 3, name: "شيبسي", price: 7 },
  { id: 4, name: "شوكولاتة", price: 12 },
  { id: 5, name: "لبن", price: 8 }
];
