// Las órdenes se guardan por número de orden, así la pantalla de
// confirmación puede encontrarlas aunque se recargue la página.
// La llave es específica de este proyecto (localStorage se comparte en *.github.io).
const STORAGE_KEY = 'pry2-ecommerce-orders';

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

// Guarda la orden, o la actualiza si ya existía.
export function saveOrder(order) {
  try {
    const orders = loadOrders();
    orders[order.orderNumber] = order;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // Almacenamiento lleno o bloqueado: la app sigue, solo sin persistencia.
  }
}

// Devuelve la orden guardada, o null si no existe.
export function getOrder(orderNumber) {
  return loadOrders()[orderNumber] ?? null;
}