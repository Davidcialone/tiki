import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import { useReservations } from "../../reservationContext";

export function CustomerView() {
    const [selectedZones, setSelectedZones] = useState([]);
    const [zonesOpened, setZonesOpened] = useState({});
    const { reservedTables, setReservedTables } = useReservations();

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
        const isSelected = selectedZones.includes(zoneKey);
        const isOpen = zonesOpened[zoneKey];

        return {
          padding: "10px",
          border: isSelected ? "4px solid #000" : "2px solid #000", // Noir (#000) pour la bordure
          height: "100%",
          boxSizing: "border-box",
          backgroundColor: isSelected
              ? isOpen
                  ? "#FFC700" // Jaune lumineux (sélectionnée et ouverte)
                  : "#FF2400" // Rouge écarlate (sélectionnée mais fermée)
              : isOpen
                  ? "#B6E4B6" // Vert vif (ouverte et non sélectionnée)
                  : "#1A1A1A", // Gris-noir très sombre (fermée et non sélectionnée)
          opacity: isSelected ? 1 : isOpen ? 0.9 : 0.4, // Opacité plus faible pour les zones non sélectionnées
          filter: isSelected ? "brightness(1.2)" : "none", // Augmente la luminosité si sélectionnée
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

    // Fonction pour basculer la sélection d'une zone
    const toggleZoneSelected = (zoneKey) => {
        setSelectedZones((prevSelected) =>
            prevSelected.includes(zoneKey)
                ? prevSelected.filter((z) => z !== zoneKey)
                : [...prevSelected, zoneKey]
        );
    };

    return (
        <div>
            <GridLayout
                className="layout"
                layout={layout}
                cols={18}
                rowHeight={30}
                width={1200}
                isDraggable={false}  // Désactive le drag-and-drop sur toute la grille
                isResizable={false}  // Désactive le redimensionnement
            >
                <div key="water" style={zoneStyle("water")}>
                    Eau
                </div>
                <div key="herb" style={zoneStyle("herb")}>
                    <button
                        style={buttonStyle("herb")}
                        onClick={() => toggleZoneSelected("herb")}
                    >
                        Herbe
                    </button>
                </div>
                <div key="way" style={zoneStyle("way")}>
                    Chemin
                </div>
                <div key="welcome" style={zoneStyle("welcome")}>
                    Bienvenue
                </div>
                <div key="terrace" style={zoneStyle("terrace")}>
                    <button
                        style={buttonStyle("terrace")}
                        onClick={() => toggleZoneSelected("terrace")}
                    >
                        Terrasse
                    </button>
                </div>
                <div key="inside" style={zoneStyle("inside")}>
                    <button
                        style={buttonStyle("inside")}
                        onClick={() => toggleZoneSelected("inside")}
                    >
                        Intérieur
                    </button>
                </div>
                <div key="gravel" style={zoneStyle("gravel")}>
                    <button
                        style={buttonStyle("gravel")}
                        onClick={() => toggleZoneSelected("gravel")}
                    >
                        Gravier
                    </button>
                </div>
            </GridLayout>
        </div>
    );
}
