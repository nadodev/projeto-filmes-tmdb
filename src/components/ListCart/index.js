import React, { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import "./style.scss";
import GetImage from "../../services/GetImage";
import { cartContext } from "../../context/cartContext";
function ListCart() {
  const { cart, removeFromCart, clearCart, total } = useContext(cartContext);

  const [changeQtd, setChangeQtd] = useState("");

  const handleChangeQtd = (e) => {
    setChangeQtd(e.target.value);
  };

  return (
    <div className="cart col-lg-6 me-5 mt-5">
      <div className="table-cart">
        <div className="conteudo-table">
          <table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Acao</th>
              </tr>
            </thead>
            <tbody>
              {cart.produtos.length > 0
                ? cart.produtos.map((item) => {
                    return (
                      <tr className="h-100">
                        <td className="text-right">
                          <img
                            className="img-responsive"
                            src={GetImage(
                              "w276_and_h350_face",
                              item.poster_path
                            )}
                            alt={item.name}
                          />
                        </td>
                        <td className="mt-5">{item.name}</td>
                        <td className="qtd-check">
                          <input
                            type="text"
                            value={item.quantidade}
                            onChange={handleChangeQtd}
                          />
                        </td>
                        <td>
                          {" "}
                          {parseInt(item.price).toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                        <td className="text-center">
                          <Link onClick={() => removeFromCart(item.id)}>
                            <BsFillTrashFill />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : "nao a items no carrinho"}
            </tbody>
          </table>
        </div>
      </div>
      {cart.produtos.length > 0 ? (
        <div className="d-flex justify-content-center flex-column bg-light mt-4">
          <div className="d-flex justify-content-between">
            <p className="mt-3">Total</p>
            <p className="me-2 mt-3">
              {total.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ListCart;
