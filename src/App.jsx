import "./styles/index.js";
import { HashRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CartProvider from "./features/cart/CartProvider";

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </HashRouter>
  );
}