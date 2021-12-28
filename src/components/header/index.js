import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { cartContext } from "../../context/cartContext";
export default function Index() {
  const { cart, search, setSearch, searchMovie, setSearchhMovie } =
    useContext(cartContext);

  const openDrawer = () => {
    const event = new CustomEvent("openCart");
    window.dispatchEvent(event);
  };
  return (
    <>
      <header>
        <div className="container">
          <Link className="logo" to="/">
            AppFilmes
          </Link>
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar"
              value={searchMovie}
              onChange={(e) => setSearchhMovie(e.target.value)}
            />
          </div>
          <div>
            <Link className="favoritos" to="/favoritos">
              <AiFillHeart size={25} />
            </Link>
            <Link className="cart" onClick={() => openDrawer()}>
              <AiOutlineShoppingCart size={25} />
              <span className="bg-cart">{cart.length}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
