import { Link } from 'react-router-dom';

export default function CartEmptyState() {
  return (
    <div className="cart-empty">
      <p className="cart-empty__icon" aria-hidden="true">🛒</p>
      <h2>Tu carrito está vacío</h2>
      <p>Agrega productos desde el catálogo para verlos aquí.</p>
      <Link to="/" className="cart-empty__link">Volver al catálogo</Link>
    </div>
  );
}