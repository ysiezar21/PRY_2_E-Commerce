import { useState, useRef, useEffect } from 'react';
import { useCart } from './CartContext';

/**
 * Botón "Agregar al carrito" reutilizable (catálogo y detalle).
 * Tras agregar, muestra "✓ Agregado" durante 1.5 s como retroalimentación.
 * Se deshabilita si el producto está agotado.
 */
export default function AddToCartButton({ product, className = '' }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const outOfStock = product.stock <= 0;

  const handleClick = (e) => {
    // La tarjeta del catálogo entera es clicable (navega al detalle):
    // sin esto, agregar al carrito también abriría el detalle.
    e.stopPropagation();
    if (outOfStock) return;

    addItem(product);
    setAdded(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      className={`add-to-cart-btn ${added ? 'is-added' : ''} ${className}`}
      onClick={handleClick}
      disabled={outOfStock}
      aria-live="polite"
    >
      {outOfStock ? 'Agotado' : added ? '✓ Agregado' : 'Agregar al carrito'}
    </button>
  );
}