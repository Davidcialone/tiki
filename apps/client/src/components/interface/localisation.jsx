import React, { useState } from "react";
import { Map } from "./map";

export function Location() {
    const address = "Chemin du Pontet, 69150 Décines-Charpieu";
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
          <h1 style={{ padding: "1rem" }}>Itinéraire</h1>
          <p>Notre adresse :</p>
          <p style={{ padding: "1rem" }}>
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#007BFF", textDecoration: "underline" }}
            >
              {address}
            </a>
          </p>
          <Map />
        </div>
      );
    }
