import { Link } from 'react-router-dom';
import { useCart } from '../features/cart/CartContext';
import { getCartSummary } from '../features/cart/cartCalculations';
import CartLineItem from '../features/cart/CartLineItem';
import CartSummary from '../features/cart/CartSummary';
import CartEmptyState from '../features/cart/CartEmptyState';

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  const { subtotal, iva, shipping, total } = getCartSummary(items);

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h1>Tu carrito</h1>
        <button className="back-button" onClick={() => window.history.back()}>
          ← Seguir comprando
        </button>
      </div>

      <div className="cart-page__content">
        <ul className="cart-line-list">
          {items.map((item) => (
            <CartLineItem key={item.id} item={item} />
          ))}
        </ul>

        <CartSummary subtotal={subtotal} iva={iva} shipping={shipping} total={total} />
      </div>
    </div>
  );
}