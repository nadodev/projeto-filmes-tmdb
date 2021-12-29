import React, { useContext } from "react";
import Dock from "react-dock";
import "./style.scss";
import { BsFillTrashFill } from "react-icons/bs";
import GetImage from "../../services/GetImage";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import ReactTooltip from "react-tooltip";

function Sidebar() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("openCart", () => setIsVisible(true));
  }, []);

  var largura = window.document.body.clientWidth;
  const { cart, removeFromCart, clearCart, total } = useContext(cartContext);

  return (
    <Dock
      className="overflow-hidden"
      position="right"
      isVisible={isVisible}
      size={largura < 768 ? 0.9 : 0.4}
      onVisibleChange={(visible) => {
        setIsVisible(visible);
      }}
    >
      <div className="sidebar container-fluid h-100pt-4 sidebar">
        <ReactTooltip />
        <div className="row products">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="limparCart d-flex justify-content-between">
              <p>Carrinho</p>
              <Link
                onClick={clearCart}
                data-tip="Limpar Carrinho"
                data-offset="right"
              >
                Esvaziar
              </Link>
            </div>
            <div className="row">
              {cart.produtos.map((item) => {
                return (
                  <div className="col-lg-12 mb-3" key={item.id}>
                    <div className="d-flex justify-content-between align-items-center h-100">
                      <img
                        className="img-responsive"
                        src={GetImage("w276_and_h350_face", item.poster_path)}
                        alt={item.name}
                      />
                      <p className="mb-1 w-10">{item.name}</p>
                      <p className="mb-1 w-10">Qtd: {item.quantidade}</p>
                      <p className="mb-1 w-10">
                        R$:{" "}
                        {item.price.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                      <button
                        data-tip="Excluir do Carrinho"
                        className="btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <BsFillTrashFill />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row aling-items-end product  position-absolute bottom-0 w-100">
          <div className="d-flex justify-content-between ">
            <p>Total</p>
            <p>
              <strong>
                {total.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            </p>
          </div>
          {cart.produtos.length > 0 ? (
            <Link
              to="cart"
              className="btn-finalizar btn btn-block btn-lg rounded-0 w-100"
              data-tip=" Finalizar Compras"
            >
              Finalizar Compras
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </Dock>
  );
}

export default Sidebar;
