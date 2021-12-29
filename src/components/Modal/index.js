import { format, parseISO } from "date-fns";
import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "../../context/cartContext";
import GetImage from "../../services/GetImage";
import pt from "date-fns/locale/pt";
import "./styles.scss";
function Modal({
  nome,
  cpf,
  email,
  cep,
  celular,
  cidade,
  estado,
  endereco,
  setNome,
  setEmail,
  setCpf,
  setCep,
  setCelular,
  setCidade,
  setEstado,
  setEndereco,
}) {
  const navigate = useHistory();
  const { show, handleClose, total, checkout, Checkout, clearCart } =
    useContext(cartContext);

  const handleSubmit = () => {
    setNome("");
    setEmail("");
    setCpf("");
    setCep("");
    setCelular("");
    setCidade("");
    setEstado("");
    setEndereco("");
    if (
      nome &&
      cpf &&
      celular &&
      email &&
      cep &&
      endereco &&
      cidade &&
      estado
    ) {
      Checkout(nome, cpf, celular, email, cep, endereco, cidade, estado);
      handleClose();
      clearCart();
      navigate.push("/");
      toast.success("Compra realizada com sucesso!");
    }
  };
  var result = new Date();
  const formattedDate = format(result, "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
    locale: pt,
    timeZone: "America/Sao_Paulo",
  });
  return (
    <>
      {show ? (
        <div className="modall">
          <div className="modall-wraper">
            <div className="modal-container">
              <div className="detalhes-pedidos">
                <h4>Detalhes Pedido</h4>
                <p>Pedido em {formattedDate}</p>
                <div className="detalhes-pedidos-container">
                  <strong>Endereço de Envio:</strong>
                  <div className="detalhe-info-cliente">
                    <p>
                      <strong>Nome: </strong> {nome}
                    </p>
                    <p>
                      <strong>Cep: </strong>
                      {cep}
                    </p>
                    <p>
                      <strong>Celular</strong>
                      {celular}
                    </p>
                  </div>
                  <p>
                    <strong>Email:</strong> {email}
                  </p>
                  <p>
                    <strong>Cidade</strong>
                    {cidade}
                    <strong>Estado</strong>
                    {estado}
                  </p>
                </div>
              </div>
              <h4>Produtos</h4>
              {checkout.checkoutt.map((item) => {
                return (
                  <div className="card-modal-produto">
                    <div className="detalhe-produtos">
                      <div className="img-produto">
                        <img
                          src={GetImage("w276_and_h350_face", item.poster_path)}
                          alt="produto"
                        />
                      </div>
                      <p>{item.name}</p>
                      <p>{item.quantidade}</p>
                      <p>
                        {parseInt(item.price).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="modal-total">
              <p>Total:</p>
              <p>
                {total.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
            <div className="btn-closee">
              <button onClick={handleClose}>
                <IoMdClose />
              </button>
            </div>
            <button className="btn-finalizar" onClick={handleSubmit}>
              Finalizar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
