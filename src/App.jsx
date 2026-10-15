import "./styles/index.js";
import { HashRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CartProvider from "./features/cart/CartProvider";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </HashRouter>
    </ErrorBoundary>
  );
}