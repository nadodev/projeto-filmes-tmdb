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
  const { cart, removeFromCart, clearCart } = useContext(cartContext);
  console.log("id", cart);

  return (
    <Dock
      className="overflow-hidden"
      position="right"
      isVisible={isVisible}
      size={largura < 768 ? 0.8 : 0.2}
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
              {cart.map((item) => (
                <div className="col-lg-12 mb-3" key={item.id}>
                  <div className="d-flex justify-content-between align-items-center h-100">
                    <img
                      className="img-responsive"
                      src={GetImage("w276_and_h350_face", item.foto)}
                      alt={item.name}
                    />
                    <p className="mb-1 w-10">{item.name.substr(0, 10)}</p>
                    <p className="mb-1 w-10">Qtd: {item.ammount}</p>
                    <p className="mb-1 w-10">R$: {item.price}</p>
                    <button
                      data-tip="Excluir do Carrinho"
                      className="btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <BsFillTrashFill />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row aling-items-end product  position-absolute bottom-0 w-100">
          <div className="d-flex justify-content-between ">
            <p>Total</p>
            <p>
              <strong>
                {" "}
                R$:{" "}
                {cart.reduce(
                  (total, item) => total + parseFloat(item.price),
                  0
                )}
              </strong>
            </p>
          </div>
          <button
            className="btn-finalizar btn btn-block btn-lg rounded-0 w-100"
            data-tip=" Finalizar Compras"
          >
            Finalizar Compras
          </button>
        </div>
      </div>
    </Dock>
  );
}

export default Sidebar;
