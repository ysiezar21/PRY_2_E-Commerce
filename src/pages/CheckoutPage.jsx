/**
 * Página de checkout.
 *
 * Solo se puede entrar con al menos un producto en el carrito;
 * si está vacío se muestra el mismo estado vacío del carrito.
 * Paso 1: formulario de comprador y entrega junto al resumen del carrito.
 * Paso 2: revisión final de la compra; al confirmar se crea la orden.
 * El pago se agrega en las siguientes partes.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../features/cart/CartContext';
import { getCartSummary } from '../features/cart/cartCalculations';
import CartSummary from '../features/cart/CartSummary';
import CartEmptyState from '../features/cart/CartEmptyState';
import CheckoutForm from '../features/checkout/CheckoutForm';
import CheckoutProgress from '../features/checkout/CheckoutProgress';
import OrderReview from '../features/checkout/OrderReview';
import { createOrder } from '../features/orders/orderModel';
import { saveOrder } from '../features/orders/orderStorage';

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  province: '',
  canton: '',
  address: '',
  notes: '',
};

export default function CheckoutPage() {
  const { items } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [reviewing, setReviewing] = useState(false);
  const [order, setOrder] = useState(null);

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  const summary = getCartSummary(items);

  const goToReview = (value) => {
    setReviewing(value);
    window.scrollTo(0, 0);
  };

  const handleConfirm = () => {
    const newOrder = createOrder({ buyer: form, items, summary });
    saveOrder(newOrder);
    setOrder(newOrder);
    window.scrollTo(0, 0);
  };

  // Mensaje temporal hasta agregar el pago y la pantalla de confirmación
  if (order) {
    return (
      <div className="checkout-page">
        <section className="order-review">
          <h2>Orden creada</h2>
          <p>Número de orden: {order.orderNumber}</p>
          <p>Estado de la orden: {order.orderStatus}</p>
          <p>Estado del pago: {order.paymentStatus}</p>
          <p>El pago se agrega en la siguiente parte.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__header">
        <h1>Finalizar compra</h1>
        <button className="back-button" onClick={() => navigate('/carrito')}>
          ← Volver al carrito
        </button>
      </div>

      <CheckoutProgress current={reviewing ? 2 : 1} />

      {reviewing ? (
        <OrderReview
          items={items}
          buyer={form}
          summary={summary}
          onEdit={() => goToReview(false)}
          onConfirm={handleConfirm}
        />
      ) : (
        <div className="checkout-page__content">
          <CheckoutForm values={form} onChange={setForm} onSubmit={() => goToReview(true)} />
          <CartSummary {...summary} />
        </div>
      )}
    </div>
  );
}