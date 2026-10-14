// Simula un proveedor externo de pagos. No usa tarjetas ni datos financieros reales.

export const PAYMENT_RESULTS = {
  APPROVED: 'PAYMENT_APPROVED',
  DECLINED: 'PAYMENT_DECLINED',
  ERROR: 'PAYMENT_ERROR',
};

export const SANDBOX_SCENARIOS = [
  { value: PAYMENT_RESULTS.APPROVED, label: 'Pago aprobado' },
  { value: PAYMENT_RESULTS.DECLINED, label: 'Pago rechazado' },
  { value: PAYMENT_RESULTS.ERROR, label: 'Error del servicio' },
];

const PROCESSING_DELAY_MS = 1500;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// En el escenario de error lanza una excepción, como un servicio que no responde
export async function processPayment({ orderId, amount, currency }, scenario) {
  await wait(PROCESSING_DELAY_MS);

  if (!orderId || !(amount > 0) || !currency || scenario === PAYMENT_RESULTS.ERROR) {
    throw new Error('El servicio de pagos no pudo procesar la solicitud');
  }

  const approved = scenario === PAYMENT_RESULTS.APPROVED;

  return {
    orderId,
    transactionId: `TXN-${Date.now()}`,
    status: approved ? PAYMENT_RESULTS.APPROVED : PAYMENT_RESULTS.DECLINED,
    message: approved ? 'Pago aprobado.' : 'Fondos insuficientes.',
    amount,
    currency,
    timestamp: new Date().toISOString(),
  };
}
