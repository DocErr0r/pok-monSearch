import React from 'react';
import './PokemonModal.css';

const PokemonModal = ({ pokemon, onClose }) => {
    if (!pokemon) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p>Base Experience: {pokemon.base_experience}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PokemonModal;
