import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import { useReservations } from "../reservationContext";

export function GravelLayout() {
    const { reservedTables, setReservedTables } = useReservations();

    const layout = [
        { i: "1", x: 0, y: 10, w: 1, h: 1 },
        { i: "2", x: 2, y: 10, w: 1, h: 1 },
        { i: "3", x: 4, y: 10, w: 1, h: 1 },
        { i: "4", x: 6, y: 10, w: 1, h: 1 },
        { i: "5", x: 0, y: 11, w: 1, h: 1 },
        { i: "6", x: 2, y: 11, w: 1, h: 1 },
        { i: "7", x: 4, y: 11, w: 1, h: 1 },
        { i: "8", x: 6, y: 11, w: 1, h: 1 },
        { i: "9", x: 0, y: 12, w: 1, h: 1 },
        { i: "10", x: 2, y: 12, w: 1, h: 1 },
        { i: "11", x: 4, y: 12, w: 1, h: 1 },
        { i: "12", x: 6, y: 12, w: 1, h: 1 },
        { i: "13", x: 0, y: 13, w: 1, h: 1 },
        { i: "14", x: 2, y: 13, w: 1, h: 1 },
        { i: "15", x: 4, y: 13, w: 1, h: 1 },
        { i: "16", x: 6, y: 13, w: 1, h: 1 },
    ];
    const priorities = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
          ];

          const reserveTables = (numGuests) => {
            let tablesToReserve = [];
        
            for (let priority of priorities) {
              const availableTables = priority.filter((table) => !reservedTables.includes(table));
        
              while (availableTables.length > 0 && tablesToReserve.length < numGuests) {
                tablesToReserve.push(availableTables.shift());
              }
        
              if (tablesToReserve.length >= numGuests) break;
            }
        
            if (tablesToReserve.length < numGuests) {
              alert("Pas assez de tables disponibles.");
              return;
            }
        
            setReservedTables((prev) => [...prev, ...tablesToReserve]);
            alert(`Tables réservées : ${tablesToReserve.join(", ")}`);
          };
          const itemStyle = (table) => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: reservedTables.includes(table) ? "4px solid #FF0000" : "2px solid black", // Couleurs vives pour contraste
            borderRadius: "6px",
            background: reservedTables.includes(table) ? "#f77" : "#e0e0e0",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            fontSize: "0.8rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "black",
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
            zIndex: 2,
          });

    return (
        <div >
            <GridLayout
                className="layout"
                layout={layout}
                cols={10} // Nombre de colonnes
                rowHeight={50} // Hauteur de chaque rangée
                width={500} // Largeur totale de la grille
                isResizable={false} // Pas de redimensionnement
                isDraggable={false} // Pas de déplacement
            >
              {layout.map(({ i }) => (
                <div key={i} style={itemStyle(i)}>Table {i.replace("table", "")}</div>
                ))}

            </GridLayout>
        </div>
    );
}