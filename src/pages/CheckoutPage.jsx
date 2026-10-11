/**
 * Página de checkout.
 *
 * Solo se puede entrar con al menos un producto en el carrito;
 * si está vacío se muestra el mismo estado vacío del carrito.
 * Por ahora muestra el resumen de la compra; el formulario y el
 * pago se agregan en las siguientes partes.
 */

import { useNavigate } from 'react-router-dom';
import { useCart } from '../features/cart/CartContext';
import { getCartSummary } from '../features/cart/cartCalculations';
import CartSummary from '../features/cart/CartSummary';
import CartEmptyState from '../features/cart/CartEmptyState';

export default function CheckoutPage() {
  const { items } = useCart();
  const navigate = useNavigate();

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

      <CartSummary subtotal={subtotal} iva={iva} shipping={shipping} total={total} />
    </div>
  );
}