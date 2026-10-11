/**
 * Página de checkout.
 *
 * Solo se puede entrar con al menos un producto en el carrito;
 * si está vacío se muestra el mismo estado vacío del carrito.
 * Muestra el formulario de comprador y entrega junto al resumen
 * de la compra; la revisión y el pago se agregan en las siguientes partes.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../features/cart/CartContext';
import { getCartSummary } from '../features/cart/cartCalculations';
import CartSummary from '../features/cart/CartSummary';
import CartEmptyState from '../features/cart/CartEmptyState';
import CheckoutForm from '../features/checkout/CheckoutForm';

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
  const [dataReady, setDataReady] = useState(false);

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  const { subtotal, iva, shipping, total } = getCartSummary(items);

  return (
    <div className="checkout-page">
      <div className="checkout-page__header">
        <h1>Finalizar compra</h1>
        <button className="back-button" onClick={() => navigate('/carrito')}>
          ← Volver al carrito
        </button>
      </div>

      <div className="checkout-page__content">
        {dataReady ? (
          <section className="checkout-ready">
            <h2>Datos listos</h2>
            <p>La revisión de la orden y el pago se agregan en la siguiente parte.</p>
            <button className="back-button" onClick={() => setDataReady(false)}>
              ← Editar datos
            </button>
          </section>
        ) : (
          <CheckoutForm values={form} onChange={setForm} onSubmit={() => setDataReady(true)} />
        )}

        <CartSummary subtotal={subtotal} iva={iva} shipping={shipping} total={total} />
      </div>
    </div>
  );
}