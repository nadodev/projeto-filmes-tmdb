import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import api from "../../services/api";
import "./style.scss";
import { toast } from "react-toastify";
export default function Filme() {
  const { id } = useParams();
  const history = useHistory();
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFimes = async () => {
      const response = await api.get(`r-api/?api=filmes/${id}`);
      if (response.data.length === 0) {
        history.replace("/");
        return;
      }
      setFilmes(response.data);
      setLoading(false);
    };
    loadFimes();
    return () => {
      /* server para desmontar o useEffect ao mudar de pagina */
    };
  }, [history, id]);

  const salvaFilme = () => {
    const minhaLista = localStorage.getItem("filmes", "salvo");

    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilmes = filmesSalvos.some(
      (filmesSalvos) => filmesSalvos.id === filmes.id
    );

    if (hasFilmes) {
      toast.error("Voce ja possui esse filme ");

      return;
    }

    filmesSalvos.push(filmes);
    localStorage.setItem("filmes", JSON.stringify(filmesSalvos));

    toast.success("filmes salvo com sucesso");
  };

  if (loading) {
    return (
      <div className="carregando">
        <h1>Aguarde um momento, seu filme está carregando!!</h1>
      </div>
    );
  }

  return (
    <section className="details-movies">
      <h2>{filmes.nome}</h2>
      <div className="voltar">
        <Link to="/">
          <i class="fas fa-arrow-left"></i> Voltar
        </Link>
      </div>
      <img src={filmes.foto} alt={filmes.nome} />
      <h4>Sinopse</h4>
      <p>{filmes.sinopse}</p>
      <div className="buttons">
        <button onClick={salvaFilme}>Favoritos</button>
        <button>
          <a
            target="blank"
            href={`https://youtube.com/results?search_query=${filmes.nome} Trailer`}
          >
            Trailler
          </a>
        </button>
      </div>
    </section>
  );
}
