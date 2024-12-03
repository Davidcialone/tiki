import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import { HerbeLayout } from "./herbLayout";
import { TerraceLayout } from "./teraceLayout";
import { InsideLayout } from "./insideLayout";
import { GravelLayout } from "./gravelLayout";

export function RestaurantLayout() {
  // Etat des zones et zones sélectionnées
  const [selectedZones, setSelectedZones] = useState([]);
  const [zonesOpened, setZonesOpened] = useState({
    terrace: true,
    herb: true,
    inside: true,
    gravel: true,
  });

  // Disposition de la grille
  const layout = [
    { i: "water", x: 0, y: 0, w: 6, h: 2 },
    { i: "herb", x: 0, y: 2, w: 6, h: 2 },
    { i: "way", x: 0, y: 3, w: 12, h: 2 },
    { i: "welcome", x: 10, y: 5, w: 2, h: 4 },
    { i: "terrace", x: 6, y: 0, w: 6, h: 4 },
    { i: "inside", x: 12, y: 0, w: 6, h: 4 },
    { i: "gravel", x: 2, y: 5, w: 6, h: 4 },
  ];

  // Style des zones (basé sur leur sélection et état ouvert/fermé)
  const zoneStyle = (zoneKey) => {
    const isSelected = selectedZones.includes(zoneKey);
    const isOpen = zonesOpened[zoneKey];

    return {
      padding: "10px",
      border: isSelected ? "4px solid #000" : "2px solid #000",
      height: "100%",
      boxSizing: "border-box",
      backgroundColor: isSelected
        ? isOpen
          ? "#FFC700"
          : "#FF2400"
        : isOpen
        ? "#B6E4B6"
        : "#1A1A1A",
      opacity: isSelected ? 1 : isOpen ? 0.9 : 0.4,
      filter: isSelected ? "brightness(1.2)" : "none",
      transition: "background-color 0.3s ease, opacity 0.3s ease, filter 0.3s ease",
    };
  };

  // Style du bouton de sélection de zone
  const buttonStyle = (zoneKey) => ({
    padding: "10px 20px",
    margin: "5px",
    border: "2px solid #000",
    backgroundColor: selectedZones.includes(zoneKey) ? "#4CAF50" : "#f0f0f0",
    color: selectedZones.includes(zoneKey) ? "#fff" : "#000",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: selectedZones.includes(zoneKey) ? "bold" : "normal",
  });

  // // Fonction pour basculer la sélection d'une zone
  // const toggleZoneSelected = (zoneKey) => {
  //   setSelectedZones((prevSelected) =>
  //     prevSelected.includes(zoneKey)
  //       ? prevSelected.filter((z) => z !== zoneKey)
  //       : [...prevSelected, zoneKey]
  //   );
  // };

  // Fonction pour changer l'état ouvert/fermé d'une zone
  const toggleZoneOpen = (zoneKey) => {
    setZonesOpened((prevZones) => ({
      ...prevZones,
      [zoneKey]: !prevZones[zoneKey],
    }));
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h1>Zones du Restaurant</h1>
      <div>
        <div>
         
          <h2>Gérer les zones :</h2>
          {Object.keys(zonesOpened).map((zoneKey) => (
            <div key={zoneKey}>
              <button
                style={buttonStyle(zoneKey)}
                // onClick={() => toggleZoneSelected(zoneKey)}
              >
                {zoneKey.charAt(0).toUpperCase() + zoneKey.slice(1)}
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  margin: "5px",
                  border: "1px solid #000",
                  cursor: "pointer",
                  backgroundColor: zonesOpened[zoneKey] ? "#4CAF50" : "#FF5733",
                  color: "#fff",
                }}
                onClick={() => toggleZoneOpen(zoneKey)}
              >
                {zonesOpened[zoneKey] ? "ouverte" : "fermée"}
              </button>
            </div>
          ))}
        </div>

        <GridLayout
          className="layout"
          layout={layout}
          cols={18}
          rowHeight={100}
          width={1600}
          isResizable={false}
          isDraggable={false}
          compactType={null}
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
  );
}
