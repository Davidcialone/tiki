import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import { HerbeLayout } from "./herbLayout"; // Import du composant HerbeLayout
import { TerraceLayout } from "./teraceLayout"; // Import du composant TerraceLayout
import { HomeLayout } from "./homeLayout"; // Import du composant HomeLayout
import { GravelLayout } from "./gravelLayout"; // Import du composant GravelLayout

export function RestaurantLayout() {
  const [selectedZones, setSelectedZones] = useState([]);

  // Configuration des zones (Herbe, Terrasse, Intérieur)
  const layout = [
    { i: "water", x: 0, y: 0, w: 6, h: 2 }, // Zone "Eau"
    { i: "herb", x: 0, y: 2, w: 6, h: 2 }, // Zone "Herbe"
    { i: "way", x: 0, y: 3, w: 12, h: 2 }, // Zone "Way"
    { i: "welcome", x: 10, y: 5, w: 2, h: 4 }, // Zone "Accueil"
    { i: "terrace", x: 6, y: 0, w: 6, h: 4 }, // Zone "Terrasse"
    { i: "interieur", x: 12, y: 0, w: 6, h: 4 }, // Zone "Intérieur"
    { i: "gravier", x: 2, y: 5, w: 6, h: 4 }, // Zone "Gravier"
  ];

  // État des zones (si elles sont ouvertes ou fermées)
  const zonesOpened = {
    terrasse: true,
    herbe: false,
    interieur: true,
    gravier: false,
  };

  // Styles conditionnels pour les zones
  const zoneStyle = (zoneKey) => ({
    padding: "10px",
    border: "2px solid #000",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: zonesOpened[zoneKey] ? "#a2f5a2" : "#f5a2a2", // Vert si ouvert, rouge si fermé
    opacity: zonesOpened[zoneKey] ? 1 : 0.5, // Opacité réduite si fermé
  });

  // Styles des boutons
  const buttonStyle = (zoneKey) => ({
    padding: "10px 20px",
    margin: "5px",
    border: "2px solid #000",
    backgroundColor: selectedZones.includes(zoneKey) ? "#4CAF50" : "#f0f0f0", // Vert si sélectionné, gris sinon
    color: selectedZones.includes(zoneKey) ? "#fff" : "#000",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: selectedZones.includes(zoneKey) ? "bold" : "normal",
  });

  // Gestion de la sélection des zones
  const toggleZoneSelected = (zoneKey) => {
    setSelectedZones((prevSelected) =>
      prevSelected.includes(zoneKey)
        ? prevSelected.filter((z) => z !== zoneKey) // Désélectionner si déjà sélectionné
        : [...prevSelected, zoneKey] // Ajouter si non sélectionné
    );
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h1>Plan du Restaurant</h1>
      {/* Conteneur pour centrer le GridLayout */}
      <div>
        {/* Boutons pour sélectionner les zones */}
        <div>
          <h2>Sélectionner des zones :</h2>
          {/* Bouton Terrasse (affiché seulement si la zone est ouverte) */}
          {zonesOpened.terrasse && (
            <button
              style={buttonStyle("terrasse")}
              onClick={() => toggleZoneSelected("terrasse")}
            >
              Terrasse
            </button>
          )}
          {/* Bouton Herbe (affiché seulement si la zone est ouverte) */}
          {zonesOpened.herbe && (
            <button
              style={buttonStyle("herbe")}
              onClick={() => toggleZoneSelected("herbe")}
            >
              Herbe
            </button>
          )}
          {/* Bouton Intérieur (affiché seulement si la zone est ouverte) */}
          {zonesOpened.interieur && (
            <button
              style={buttonStyle("interieur")}
              onClick={() => toggleZoneSelected("interieur")}
            >
              Intérieur
            </button>
          )}
          {/* Bouton Gravier (affiché seulement si la zone est ouverte) */}
          {zonesOpened.gravier && (
            <button
              style={buttonStyle("gravier")}
              onClick={() => toggleZoneSelected("gravier")}
            >
              Gravier
            </button>
          )}
        </div>

        <GridLayout
          className="layout"
          layout={layout}
          cols={18} // Total des colonnes (6 par zone pour un alignement équitable)
          rowHeight={100} // Hauteur de chaque rangée (ajustable pour une meilleure vue)
          width={1600} // Largeur totale de la grille (ajustez selon vos besoins)
          isResizable={false}
          isDraggable={false}
          compactType={null} // Désactive le compactage automatique
        >
          {/* Zone "Eau" */}
          <div key="water" style={{ ...zoneStyle("water"), backgroundColor: "blue" }}>
            <h2 style={{ textAlign: "center", color: "#fff" }}>Zone Eau</h2>
          </div>

          {/* Zone "Herbe" */}
          <div key="herb" style={{ ...zoneStyle("herb"), backgroundColor: "green" }}>
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Zone Herbe</h2>
            <div style={{ flex: 1, display: "flex" }}>
              <HerbeLayout />
            </div>
          </div>

          {/* Zone "Terrasse" */}
          <div key="terrace" style={{ ...zoneStyle("terrace"), backgroundColor: "brown" }}>
            <h2 style={{ textAlign: "center", color: "#fff" }}>Zone Terrasse</h2>
            <TerraceLayout />
          </div>

          {/* Zone "Intérieur" */}
          <div key="interieur" style={{ ...zoneStyle("interieur"), backgroundColor: "grey" }}>
            <h2 style={{ textAlign: "center" }}>Zone Intérieur</h2>
            <HomeLayout />
          </div>

          {/* Zone "chemin" */}
          <div key="way" style={{ ...zoneStyle("way"), backgroundColor: "#393C41" }}>
            <h2 style={{ textAlign: "center" }}>Zone Chemin</h2>
          </div>

          {/* Zone "accueil" */}
          <div key="welcome" style={{ ...zoneStyle("welcome"), backgroundColor: "#393C41" }}>
            <h2 style={{ textAlign: "center" }}>Zone Accueil</h2>
          </div>

          {/* Zone "gravier" */}
          <div key="gravier" style={{ ...zoneStyle("gravier"), backgroundColor: "grey" }}>
            <h2 style={{ textAlign: "center" }}>Zone Gravier</h2>
            <GravelLayout />
          </div>
        </GridLayout>
      </div>
    </div>
  );
}
