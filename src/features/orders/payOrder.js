import { processPayment, PAYMENT_RESULTS } from '../../services/paymentSandbox';
import { applyPaymentResult, startPayment } from './orderModel';
import { saveOrder } from './orderStorage';

// Nunca lanza error: siempre devuelve la orden actualizada y guardada
export async function payOrder(order, scenario) {
  const pending = startPayment(order);
  saveOrder(pending);

  const request = { orderId: pending.orderNumber, amount: pending.total, currency: pending.currency };

  let response;
  try {
    response = await processPayment(request, scenario);
  } catch {
    response = {
      status: PAYMENT_RESULTS.ERROR,
      message: 'No pudimos comunicarnos con el servicio de pagos.',
    };
  }

  const updated = applyPaymentResult(pending, response);
  saveOrder(updated);
  return updated;
}
