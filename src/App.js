import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const { results } = await res.json();
        const detailed = await Promise.all(
          results.map(async ({ url }) => {
            const { id, name, sprites, types } = await (
              await fetch(url)
            ).json();
            return {
              id,
              name,
              image: sprites.front_default,
              types: types.map((t) => t.type.name),
            };
          })
        );
        setPokemons(detailed);
      } catch (err) {
        console.error("Erro ao buscar Pokémons:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Carregando Pokémons...</p>;

  return (
    <div className="App">
      <div className="imagens">
        <h1>Pokédex</h1>
        <div className="pokemon-container">
          {pokemons.map(({ id, name, image, types }) => (
            <div key={id} className="pokemon-card">
              <div className="imagens-poke">
                <div className="fundo-blur"></div>
                <img src={image} alt={name} className="pokemons" />
              </div>
              <div className="descPokemon">
                <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
                <p>Tipo: {types.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
