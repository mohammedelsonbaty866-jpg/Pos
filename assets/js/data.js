/* data.js | POS PRO DATA LAYER */

const DB_KEY = "pos_pro_db";

/* =========================
   Default Database
========================= */
const defaultDB = {
  users: [
    {
      id: 1,
      username: "admin",
      password: "1234",
      role: "admin"
    }
  ],
  products: [
    {
      id: 1,
      name: "منتج تجريبي",
      price: 10,
      barcode: "123456",
      stock: 100
    }
  ],
  invoices: [],
  settings: {
    theme: "light"
  }
};

/* =========================
   Load Database
========================= */
function loadDB() {
  let db = localStorage.getItem(DB_KEY);
  if (!db) {
    localStorage.setItem(DB_KEY, JSON.stringify(defaultDB));
    return defaultDB;
  }
  return JSON.parse(db);
}

/* =========================
   Save Database
========================= */
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

/* =========================
   Getters
========================= */
function getUsers() {
  return loadDB().users;
}

function getProducts() {
  return loadDB().products;
}

function getInvoices() {
  return loadDB().invoices;
}

function getSettings() {
  return loadDB().settings;
}

/* =========================
   Updaters
========================= */
function updateProducts(products) {
  const db = loadDB();
  db.products = products;
  saveDB(db);
}

function addInvoice(invoice) {
  const db = loadDB();
  db.invoices.push(invoice);
  saveDB(db);
}

function updateSettings(settings) {
  const db = loadDB();
  db.settings = settings;
  saveDB(db);
}
