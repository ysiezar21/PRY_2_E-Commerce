/**
 * Navbar principal: logo (enlace al catálogo), búsqueda de Algolia
 * e indicador del carrito, que abre el menú lateral (CartDrawer).
 * Estilos en styles/components/Header.css y CartIndicator.css.
 */
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../features/cart/CartContext';
import CartDrawer from '../features/cart/CartDrawer';
import SearchBar from '../features/catalog/components/SearchBar';
import logo from '../assets/techgrid-logo.png';

export default function Header() {
  const { totalItems } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <header className="App-header">
        <div className="navbar">
          <Link to="/" className="navbar__brand" aria-label="TechGrid Distributions, ir al catálogo">
            <img
              src={logo}
              alt="TechGrid Distributions"
              className="navbar__logo"
            />
          </Link>

          <div className="navbar__search">
            <SearchBar />
          </div>

          <button
            type="button"
            className="cart-indicator"
            onClick={() => setDrawerOpen(true)}
            aria-label={`Abrir carrito, ${totalItems} ${totalItems === 1 ? 'unidad' : 'unidades'}`}
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
          </button>
        </div>
      </header>

      {/* Fuera del <header> para no heredar sus estilos */}
      <CartDrawer open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
