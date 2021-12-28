import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import { AiFillHeart, AiFillStar } from "react-icons/ai";

import api from "../../services/api";
import MainPagination from "../../components/paginations/mainPagination";

import Sidebar from "../../components/Sidebar";
import GetImage from "../../services/GetImage";

import { toast } from "react-toastify";
import "./style.scss";
export default function Home() {
  const listScroll = React.useRef(null);
  const scrollToRefObject = (ref) => window.scrollTo(0, ref.current?.offsetTop);

  const [type, setType] = useState("movie");
  const [listMovie, setListMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [totalResults, setTotalResults] = useState(null);

  // Cart

  const { searchMovie, cart, addToCart } = useContext(cartContext);
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
            console.log(response.data.results);
          }
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

    LoadTvs();
  }, [type, currentPage]);

  const filterBusca = listMovie.filter((item) =>
    item.name.toLowerCase().includes(searchMovie.toLowerCase())
  );

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
              <article>
                <span className="favHeart">
                  <button>
                    <AiFillHeart color="#4b5c6b" />
                  </button>
                </span>
                <img
                  src={GetImage("w276_and_h350_face", filme.poster_path)}
                  alt={filme.name}
                />
                <strong>{filme.name.substr(0, 21) + "..."}</strong>
                <span className="filmeInfo">
                  <span className="d-flex align-items-center justify-content-center">
                    <AiFillStar /> 7.5
                  </span>
                  <p>Acao</p>
                </span>
                <p>R$: 10,00</p>
                <Link onClick={() => addToCart(filme.name, filme.poster_path)}>
                  Adicionar
                </Link>
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
