import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { cartContext } from "../../context/cartContext";
export default function Index() {
  const { searchMovie, setSearchhMovie, calcQuantity } =
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
              className="form-control input-resp"
              placeholder="Pesquisar"
              value={searchMovie}
              onChange={(e) => setSearchhMovie(e.target.value)}
            />
          </div>
          <div>
            <Link className="cart" onClick={() => openDrawer()}>
              <AiOutlineShoppingCart size={25} />
              <span className="bg-cart">{calcQuantity()}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
