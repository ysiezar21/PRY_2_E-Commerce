/**
 * Encabezado principal de la aplicación.
 * Muestra el título del catálogo y el indicador del carrito con la
 * cantidad total de unidades. Los estilos viven en
 * styles/components/Header.css (.App-header) y CartIndicator.css.
 */
import { Link } from 'react-router-dom';
import { useCart } from '../features/cart/CartContext';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="App-header">
      <Link
        to="/carrito"
        className="cart-indicator"
        aria-label={`Ver carrito, ${totalItems} ${totalItems === 1 ? 'unidad' : 'unidades'}`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span className="cart-indicator__count">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      </Link>
      <h1>Catálogo de Productos</h1>
    </header>
  );
}