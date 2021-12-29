import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import { AiFillHeart, AiFillStar } from "react-icons/ai";

import api from "../../services/api";
import MainPagination from "../../components/paginations/mainPagination";

import Sidebar from "../../components/Sidebar";
import GetImage from "../../services/GetImage";

import "./style.scss";
import { toast } from "react-toastify";
export default function Home() {
  const listScroll = React.useRef(null);
  const scrollToRefObject = (ref) => window.scrollTo(0, ref.current?.offsetTop);

  const [type, setType] = useState("movie");
  const [listMovie, setListMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [totalResults, setTotalResults] = useState(null);

  // contexto
  const { searchMovie, cart, addToCart, adicionarProduto } =
    useContext(cartContext);

  // useEffect para carregar a lista de filmes
  useEffect(() => {
    function LoadTvs() {
      scrollToRefObject(listScroll);
      setLoading(true);

      api
        .get(`/tv/${type == "movie" ? "popular" : "top_rated"}`, {
          params: {
            page: currentPage,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setListMovie(response.data.results);
            setLastPage(response.data.total_pages);
            setTotalResults(response.data.total_results);
            console.log("result", response.data.results);
          }
        })
        .catch((error) => {
          console.log(" error " + error);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
    LoadTvs();
  }, [type, currentPage]);

  const addFavorito = () => {
    const minhaLista = localStorage.getItem("filmes", "salvo");

    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilmes = filmesSalvos.some(
      (filmesSalvos) => filmesSalvos.id === listMovie.id
    );

    if (hasFilmes) {
      toast.error("Voce ja possui esse filme ");

      return;
    }

    filmesSalvos.push(listMovie);
    localStorage.setItem("filmes", JSON.stringify(filmesSalvos));

    toast.success("filmes salvo com sucesso");
  };

  // função para fazer busca
  const filterBusca = listMovie.filter((item) =>
    item.name.toLowerCase().includes(searchMovie.toLowerCase())
  );

  // verificação  da pesquisa
  if (filterBusca.length === 0) {
    return (
      <main className="container" ref={listScroll}>
        <section className="list-movies filmeBusca">
          <p className="alert alert-danger">Nenhum Filme encontrado</p>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="container" ref={listScroll}>
        <Sidebar cart={(cart, listMovie)} />
        <section className="list-movies">
          {filterBusca.map((filme) => {
            return (
              <article key={filme.id}>
                <span className="favHeart">
                  <button onClick={addFavorito}>
                    <AiFillHeart color="#4b5c6b" />
                  </button>
                </span>
                <img
                  src={GetImage("w276_and_h350_face", filme.poster_path)}
                  alt={filme.name}
                />
                <strong>{filme.name.substr(0, 10) + "..."}</strong>
                <span className="filmeInfo">
                  <span className="d-flex align-items-center justify-content-center">
                    <AiFillStar /> 7.5
                  </span>
                  <p>Acao</p>
                </span>
                <p>R$: 30,00</p>
                <Link onClick={() => adicionarProduto(filme)}>Adicionar</Link>
              </article>
            );
          })}
          <div className="pagination ms-4 w-100 d-block">
            {searchMovie.length < 1 && (
              <MainPagination
                handler_current_page={setCurrentPage}
                current_page={currentPage}
                total_results={totalResults}
                last_page={lastPage}
                loading={loading}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
