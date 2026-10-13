import { processPayment, PAYMENT_RESULTS } from '../../services/paymentSandbox';
import { applyPaymentResult } from './orderModel';
import { saveOrder } from './orderStorage';

// Nunca lanza error: siempre devuelve la orden actualizada y guardada
export async function payOrder(order, scenario) {
  const request = { orderId: order.orderNumber, amount: order.total, currency: order.currency };

  let response;
  try {
    response = await processPayment(request, scenario);
  } catch {
    response = {
      status: PAYMENT_RESULTS.ERROR,
      message: 'No pudimos comunicarnos con el servicio de pagos.',
    };
  }

  const updated = applyPaymentResult(order, response);
  saveOrder(updated);
  return updated;
}
