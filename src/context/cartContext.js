import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [type, setType] = useState("movie");
  const [listMovie, setListMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [cart, setCart] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchMovie, setSearchhMovie] = React.useState("");

  const addToCart = (name, poster_path) => {
    const ramdomNum = Math.floor(Math.random() * 1000 + 1 + Date.now());
    const items = {
      id: ramdomNum,
      name: name,
      foto: poster_path,
      price: "10.00",
      ammount: 1,
    };

    const movieIndex = cart.findIndex((item) => item.id === items.id);
    if (movieIndex >= 0) {
      cart[movieIndex].ammount += 1;
    } else {
      setCart([...cart, items]);
      toast.success("Produto adicionado com sucesso!");
    }
  };

  function removeFromCart(id) {
    const newCart = cart.filter((item) => item.id !== id);

    setCart(newCart);
  }
  function clearCart() {
    setCart([]);
  }

  React.useEffect(() => {
    function LoadPesquisa() {
      // https://api.themoviedb.org/3/
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
  }, [type, currentPage, search]);

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        removeFromCart,
        search,
        setSearch,
        setSearchhMovie,
        searchMovie,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
