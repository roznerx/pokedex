import { useState } from "react";
import "./PokemonCard.css";

export default function PokemonCard({ name, number, image, types }) {
  return (
    <li className="pokemon-card">
      <img 
        src={image} 
        alt={name} 
        loading="lazy"
        className={`pokemon-image`}
      />
      <div className="pokemon-number">
        #{number.toString().padStart(4, "0")}
      </div>
      <div className="pokemon-name">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </div>
      <div className="pokemon-types">
        {
          types.map((type) => (
            <span 
              key={type.type.name} 
              className={`type ${type.type.name.toLowerCase()}`}
            >
              {type.type.name}
            </span>
          ))
        }
      </div>
    </li>
  );
};
