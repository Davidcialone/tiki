import React from "react";
import GridLayout from "react-grid-layout";
import { HerbeLayout } from "./herbLayout"; // Import du composant HerbeLayout
import { TerraceLayout } from "./teraceLayout"; // Import du composant TerraceLayout
import { HomeLayout } from "./homeLayout"; // Import du composant HomeLayout

export function RestaurantLayout() {
  // Configuration des zones (Herbe, Terrasse, Intérieur)
  const layout = [
    { i: "herbe", x: 0, y: 0, w: 6, h: 2 }, // Zone "Herbe"
    { i: "terrace", x: 6, y: 0, w: 6, h: 4 }, // Zone "Terrasse"
    { i: "interieur", x: 12, y: 0, w: 6, h: 4 }, // Zone "Intérieur"
  ];

  // Styles communs
  const zoneStyle = {
    padding: "10px",
    border: "2px solid #000",
    height: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Plan du Restaurant</h1>
      <GridLayout
        className="layout"
        layout={layout}
        cols={18} // Total des colonnes (6 par zone pour un alignement équitable)
        rowHeight={100} // Hauteur de chaque rangée (ajustable pour une meilleure vue)
        width={1600} // Largeur totale de la grille (ajustez selon vos besoins)
        isResizable={false}
        isDraggable={false}
      >
        {/* Zone "Herbe" */}
        <div key="herbe" style={{ ...zoneStyle, backgroundColor: "green" }}>
  <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Zone Herbe</h2>
  <div style={{ flex: 1, display: "flex" }}>
    <HerbeLayout />
  </div>
</div>


        {/* Zone "Terrasse" */}
        <div key="terrace" style={{ ...zoneStyle, backgroundColor: "brown" }}>
          <h2 style={{ textAlign: "center", color: "#fff" }}>Zone Terrasse</h2>
          <TerraceLayout />
        </div>

        {/* Zone "Intérieur" */}
        <div key="interieur" style={{ ...zoneStyle, backgroundColor: "grey" }}>
          <h2 style={{ textAlign: "center" }}>Zone Intérieur</h2>
          <HomeLayout />
        </div>
      </GridLayout>
    </div>
  );
}
