/**
 * Layout principal de la aplicación.
 *
 * InstantSearch envuelve toda la app para que la búsqueda del Navbar
 * y el catálogo compartan el mismo estado de Algolia.
 *
 * Rutas:
 *   - "/"              → catálogo con filtros y paginación.
 *   - "/producto/:id"  → detalle de un producto.
 *   - "/carrito"       → carrito de compras.
 *   - "/checkout"      → proceso de compra.
 *   - cualquier otra   → página 404.
 *
 * Las rutas van dentro de un ErrorBoundary: si una página falla, se muestra
 * un mensaje comprensible (con el Header y el Footer intactos) en lugar de
 * una pantalla en blanco. El error se limpia solo al cambiar de ruta.
 */

import { Routes, Route, useLocation } from "react-router-dom";
import { InstantSearch } from "react-instantsearch";
import { searchClient, indexName } from "../config/algolia";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorBoundary from "../components/ErrorBoundary";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import NotFoundPage from "./NotFoundPage";

export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div className="App">
        <Header />
        <main className="app-main">
          <ErrorBoundary resetKey={pathname}>
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </InstantSearch>
  );
}