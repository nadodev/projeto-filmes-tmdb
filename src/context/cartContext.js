import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estados
  const [type, setType] = useState("movie");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState({ produtos: [] });
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchhMovie] = useState("");
  const [checkout, setCheckout] = useState({ checkoutt: [] });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    function LoadPesquisa() {
      api
        .get(
          `search/movie?api_key=9485e521f73209c2a78614a83105fd49&query=${search}`
        )
        .then((response) => {
          setSearchhMovie(response.data.results);
          console.log(response.data.results);
        })
        .catch((error) => {
          console.log("LoadTvs error " + error);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
    LoadPesquisa();

    return () => {};
  }, [type, currentPage, search]);

  // Função para adicionar ao carrinho
  const adicionarProduto = (produto) => {
    const objCarrinho = Object.assign({}, cart);
    let novoProduto = true;
    objCarrinho.produtos.forEach((prod, indice) => {
      if (prod.id === produto.id) {
        objCarrinho.produtos[indice].quantidade++;
        novoProduto = false;
      }
    });

    //adicionar produto
    if (novoProduto) {
      objCarrinho.produtos.push({ ...produto, quantidade: 1, price: 30 });
    }
    window.localStorage.setItem("cart", JSON.stringify(objCarrinho));
    toast.success("Produto adicionado com sucesso!");
    setCart(objCarrinho);
  };

  // Calcula Quantidade
  const calcQuantity = () => {
    const objCarrinho = Object.assign({}, cart);
    let total = 0;
    objCarrinho.produtos.forEach((prod) => {
      total += prod.quantidade;
    });
    return total;
  };

  // Função para remover do carrinho
  const removeFromCart = (id) => {
    const objCarrinho = Object.assign({}, cart);
    objCarrinho.produtos = objCarrinho.produtos.filter(
      (prod) => prod.id !== id
    );
    window.localStorage.setItem("cart", JSON.stringify(objCarrinho));
    setCart(objCarrinho);
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    window.localStorage.removeItem("cart");
    setCart({ produtos: [] });
  };

  // Carrega os dados do localstorage
  useEffect(() => {
    const storage = window.localStorage.getItem("cart");
    if (storage) {
      setCart(JSON.parse(storage));
    }
  }, []);

  // Retorna total produtos Carrinho
  const total = cart.produtos
    ? cart.produtos.reduce((total, produto) => {
        return total + produto.quantidade * produto.price;
      }, 0)
    : null;

  // checkout
  const Checkout = () => {
    const storage = window.localStorage.getItem("cart");
    const newProduct = JSON.parse(storage);
    const objCarrinho = Object.assign({}, checkout);
    const { produtos } = newProduct;
    objCarrinho.checkoutt = produtos;
    setCheckout(objCarrinho);
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        clearCart,
        removeFromCart,
        search,
        setSearch,
        setSearchhMovie,
        searchMovie,
        calcQuantity,
        adicionarProduto,
        total,
        Checkout,
        checkout,
        show,
        handleClose,
        handleShow,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
