import { getLineSubtotal } from '../cart/cartCalculations';
import { PAYMENT_RESULTS } from '../../services/paymentSandbox';

// Estado de la orden y estado del pago son cosas distintas:
// la orden dice si la compra quedó cerrada, el pago dice qué pasó con el cobro.
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED',
};

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  ERROR: 'ERROR',
};

export const CURRENCY = 'CRC';

// Evita errores de decimales al multiplicar
const roundMoney = (value) => Math.round(value * 100) / 100;

// Sin letras ni números que se confundan entre sí (0/O, 1/I)
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

// Formato: ORD-20261012-A7K2Q9
export function generateOrderNumber(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }

  return `ORD-${year}${month}${day}-${code}`;
}

// Construye la orden con una copia de los datos del carrito y del formulario.
// Nace pendiente: el estado cambia cuando llega el resultado del pago.
export function createOrder({ buyer, items, summary }) {
  const now = new Date();

  return {
    orderNumber: generateOrderNumber(now),
    date: now.toISOString(),
    currency: CURRENCY,
    buyer: {
      fullName: buyer.fullName.trim(),
      email: buyer.email.trim(),
      phone: buyer.phone.trim(),
    },
    delivery: {
      province: buyer.province,
      canton: buyer.canton,
      address: buyer.address.trim(),
      notes: buyer.notes.trim(),
    },
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      subtotal: roundMoney(getLineSubtotal(item)),
    })),
    subtotal: roundMoney(summary.subtotal),
    iva: roundMoney(summary.iva),
    shippingCost: roundMoney(summary.shipping),
    total: roundMoney(summary.total),
    orderStatus: ORDER_STATUS.PENDING,
    paymentStatus: PAYMENT_STATUS.PENDING,
    paymentAttempts: [],
  };
}

export function startPayment(order) {
  return { ...order, orderStatus: ORDER_STATUS.PENDING, paymentStatus: PAYMENT_STATUS.PENDING };
}

// Orden que el usuario dejó sin pagar para crear otra
export function abandonOrder(order) {
  return { ...order, orderStatus: ORDER_STATUS.FAILED };
}

// Si el servicio falla, la orden sigue pendiente porque no hubo respuesta del cobro
export function applyPaymentResult(order, response) {
  const attempt = {
    transactionId: response.transactionId ?? null,
    status: response.status,
    message: response.message,
    timestamp: response.timestamp ?? new Date().toISOString(),
  };
  const updated = { ...order, paymentAttempts: [...order.paymentAttempts, attempt] };

  if (response.status === PAYMENT_RESULTS.APPROVED) {
    return { ...updated, orderStatus: ORDER_STATUS.CONFIRMED, paymentStatus: PAYMENT_STATUS.APPROVED };
  }
  if (response.status === PAYMENT_RESULTS.DECLINED) {
    return { ...updated, orderStatus: ORDER_STATUS.FAILED, paymentStatus: PAYMENT_STATUS.DECLINED };
  }
  return { ...updated, orderStatus: ORDER_STATUS.PENDING, paymentStatus: PAYMENT_STATUS.ERROR };
}