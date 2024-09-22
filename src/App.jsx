import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from './components/Card';
import PokemonModal from './components/PokemonModal';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');
            const pokemonData = await Promise.all(
                response.data.results.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url); // Fetch each Pokémon's details
                    return res.data; // Return the full Pokémon data, including images
                }),
            );
            console.log(pokemonData);

            setPokemons(pokemonData); // Set the complete data in state
        };
        fetchPokemons();
    }, []);

    const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleCardClick = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const handleCloseModal = () => {
        setSelectedPokemon(null);
    };

    return (
        <div className="App">
            <h1>Pokémon Search</h1>
            <input className='searchbar' type="text" placeholder="Search Pokémon..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className="pokemon-list">
                {filteredPokemons.map((pokemon) => (
                    <div key={pokemon.name} onClick={() => handleCardClick(pokemon)}>
                        <PokemonCard pokemon={pokemon} />
                    </div>
                ))}
            </div>
            <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
        </div>
    );
};

export default App;
