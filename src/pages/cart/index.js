import React, { useEffect, useState, useContext } from "react";
import { cartContext } from "../../context/cartContext";

import Sidebar from "../../components/Sidebar";

import "./style.scss";
import FormCart from "../../components/FormCart";
import ListCart from "../../components/ListCart";
export default function Cart() {
  const [listMovie, setListMovie] = useState([]);

  // contexto
  const { cart } = useContext(cartContext);

  return (
    <>
      <main className="container">
        <Sidebar cart={(cart, listMovie)} />
        <section className="Cart content d-flex justify-content-center align-items-start mt-5">
          <div className="cart-responsive d-flex justify-content-center align-items-start">
            <FormCart />
            <ListCart />
          </div>
        </section>
      </main>
    </>
  );
}
