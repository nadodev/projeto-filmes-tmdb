import React from "react";
import Router from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/cartContext";
import "./index.css";
function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router />
        <ToastContainer autoClose={3000} />
      </CartProvider>
    </div>
  );
}
export default App;
