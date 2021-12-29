import React, { useContext, useState } from "react";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { cartContext } from "../../context/cartContext";
import Modal from "../Modal";

import "./style.scss";
function FormCart() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const { Checkout, checkout, handleShow, handleClose } =
    useContext(cartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome) {
      toast.error("Preencha o campo nome");
    } else if (!cpf) {
      toast.error("Preencha o campo cpf");
    } else if (!celular) {
      toast.error("Preencha o campo celular");
    } else if (!email) {
      toast.error("Preencha o campo email");
    } else if (!cep) {
      toast.error("Preencha o campo cep");
    } else if (!endereco) {
      toast.error("Preencha o campo endereço");
    } else if (!cidade) {
      toast.error("Preencha o campo cidade");
    } else if (!estado) {
      toast.error("Preencha o campo estado");
    }
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
      handleShow();
    }
  };

  return (
    <div className="form col-lg-6 me-5">
      <Modal
        nome={nome}
        cpf={cpf}
        email={email}
        cep={cep}
        celular={celular}
        endereco={endereco}
        cidade={cidade}
        estado={estado}
        setNome={setNome}
        setCpf={setCpf}
        setCelular={setCelular}
        setEmail={setEmail}
        setCep={setCep}
        setEndereco={setEndereco}
        setCidade={setCidade}
        setEstado={setEstado}
      />
      <h3 className="mb-4">Finalizar Compra</h3>
      {/* Input Nome */}
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nome Completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-between">
        {/* Input Cpf */}
        <div className="form-group">
          <InputMask
            mask="999.999.999-99"
            type="text"
            className="form-control"
            placeholder="Cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        {/* Input Celular */}
        <div className="form-group">
          <InputMask
            mask="(99) 99999-9999"
            type="text"
            className="form-control"
            placeholder="Celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-between">
        <div className="form-group">
          <InputMask
            mask="99999-999"
            type="text"
            className="form-control"
            placeholder="Cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="form-group ">
          <input
            type="text"
            className="form-control"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
      </div>
      <Link
        onClick={handleSubmit}
        className=" btn-finalizar btn btn-primary w-100"
      >
        Finalizar
      </Link>
    </div>
  );
}

export default FormCart;
