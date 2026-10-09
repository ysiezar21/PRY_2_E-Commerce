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
 */

import { Routes, Route } from "react-router-dom";
import { InstantSearch } from "react-instantsearch";
import { searchClient, indexName } from "../config/algolia";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";

export default function MainLayout() {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div className="App">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/carrito" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </InstantSearch>
  );
}
