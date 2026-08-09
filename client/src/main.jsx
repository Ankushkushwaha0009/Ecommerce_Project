import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import CartProvider from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <App />
      <Toaster position="top-right" />
    </CartProvider>
  </AuthProvider>,
);
