import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import { HerbeLayout } from "./herbLayout";
import { TerraceLayout } from "./teraceLayout";
import { InsideLayout } from "./insideLayout";
import { GravelLayout } from "./gravelLayout";
// import { ZoneProvider } from "../../../zoneContext";

export function RestaurantLayout() {
  const [zonesOpened, setZonesOpened] = useState({
    terrace: true,
    herb: true,
    inside: true,
    gravel: true,
  });

  const layout = [
    { i: "water", x: 0, y: 0, w: 6, h: 2 },
    { i: "herb", x: 0, y: 2, w: 6, h: 2 },
    { i: "way", x: 0, y: 3, w: 12, h: 2 },
    { i: "welcome", x: 10, y: 5, w: 2, h: 4 },
    { i: "terrace", x: 6, y: 0, w: 6, h: 4 },
    { i: "inside", x: 12, y: 0, w: 6, h: 4 },
    { i: "gravel", x: 2, y: 5, w: 6, h: 4 },
  ];

  const zoneStyle = (zoneKey) => {
    const isOpen = zonesOpened[zoneKey];
    return {
      padding: "10px",
      border: "2px solid #000",
      height: "100%",
      boxSizing: "border-box",
      backgroundColor: isOpen ? "#B6E4B6" : "#1A1A1A",
      opacity: isOpen ? 0.9 : 0.4,
      transition: "background-color 0.3s ease, opacity 0.3s ease",
    };
  };

  const toggleZoneOpen = (zoneKey) => {
    setZonesOpened((prevZones) => ({
      ...prevZones,
      [zoneKey]: !prevZones[zoneKey],
    }));
  };

  console.log(zonesOpened);
  return (
    // <ZoneProvider>
    <div style={{ width: "100%", textAlign: "center" }}>
      <h1>Zones du Restaurant</h1>

      {/* Section des boutons et titres */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h2>Gérer les zones :</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {Object.keys(zonesOpened).map((zoneKey) => (
            <div
              key={zoneKey}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                {zoneKey.charAt(0).toUpperCase() + zoneKey.slice(1)}
              </p>
              <button
                style={{
                  padding: "5px 10px",
                  border: "1px solid #000",
                  cursor: "pointer",
                  backgroundColor: zonesOpened[zoneKey] ? "#4CAF50" : "#FF5733",
                  color: "#fff",
                  borderRadius: "5px",
                }}
                onClick={() => toggleZoneOpen(zoneKey)}
              >
                {zonesOpened[zoneKey] ? "ouverte" : "fermée"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section du layout contenant GridLayout */}
      <div
        style={{
          width: "100%",
          height: " auto", // Fixer une hauteur ou utiliser un pourcentage
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginTop: "20px",
          padding: "10px",
          boxSizing: "border-box",
          overflow: "auto", // Pour éviter que le contenu dépasse
        }}
      >
        <GridLayout
          className="layout"
          layout={layout}
          cols={18}
          rowHeight={100}
          width={1600}
          isResizable={true} // Permet de redimensionner
          isDraggable={false} // Permet de déplacer
          compactType={null}
          style={{
            width: "100%", // La grille prend toute la largeur du parent
            height: "100%", // La grille prend toute la hauteur du parent
          }}
        >
          <div key="water" style={{ ...zoneStyle("water"), backgroundColor: "blue" }}>
            <h2 style={{ textAlign: "center", color: "#fff" }}>Zone Eau</h2>
          </div>
          <div key="herb" style={{ ...zoneStyle("herb"), backgroundColor: "green" }}>
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Zone Herbe</h2>
            <HerbeLayout />
          </div>
          <div key="terrace" style={{ ...zoneStyle("terrace"), backgroundColor: "brown" }}>
            <h2 style={{ textAlign: "center", color: "#fff" }}>Zone Terrasse</h2>
            <TerraceLayout />
          </div>
          <div key="inside" style={{ ...zoneStyle("inside"), backgroundColor: "grey" }}>
            <h2 style={{ textAlign: "center" }}>Zone Intérieur</h2>
            <InsideLayout />
          </div>
          <div key="way" style={{ ...zoneStyle("way"), backgroundColor: "#393C41" }}>
            <h2 style={{ textAlign: "center" }}>Zone Chemin</h2>
          </div>
          <div key="welcome" style={{ ...zoneStyle("welcome"), backgroundColor: "#393C41" }}>
            <h2 style={{ textAlign: "center" }}>Zone Accueil</h2>
          </div>
          <div key="gravel" style={{ ...zoneStyle("gravel"), backgroundColor: "grey" }}>
            <h2 style={{ textAlign: "center" }}>Zone Gravier</h2>
            <GravelLayout />
          </div>
        </GridLayout>
      </div>
    </div>
  //  </ZoneProvider>
  );
}
