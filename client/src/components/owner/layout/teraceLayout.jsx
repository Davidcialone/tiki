import React from "react";
import GridLayout from "react-grid-layout";
import { useReservations } from "../../../reservationContext";

export function TerraceLayout() {
  const { reservedTables, setReservedTables } = useReservations();

  const layout = [
    { i: "1", x: 0, y: 0, w: 1, h: 1 },
    { i: "2", x: 2, y: 0, w: 1, h: 1 },
    { i: "3", x: 4, y: 0, w: 1, h: 1 },
    { i: "4", x: 6, y: 0, w: 1, h: 1 },
    { i: "5", x: 8, y: 0, w: 1, h: 1 },
    { i: "6", x: 0, y: 1, w: 1, h: 1 },
    { i: "7", x: 2, y: 1, w: 1, h: 1 },
    { i: "8", x: 4, y: 1, w: 1, h: 1 },
    { i: "9", x: 6, y: 1, w: 1, h: 1 },
    { i: "10", x: 8, y: 1, w: 1, h: 1 },
    { i: "11", x: 0, y: 2, w: 1, h: 1 },
    { i: "12", x: 2, y: 2, w: 1, h: 1 },
    { i: "13", x: 4, y: 2, w: 1, h: 1 },
    { i: "14", x: 6, y: 2, w: 1, h: 1 },
    { i: "15", x: 8, y: 2, w: 1, h: 1 },
    { i: "16", x: 0, y: 3, w: 1, h: 1 },
    { i: "17", x: 2, y: 3, w: 1, h: 1 },
    { i: "18", x: 4, y: 3, w: 1, h: 1 },
    { i: "19", x: 6, y: 3, w: 1, h: 1 },
    { i: "20", x: 8, y: 3, w: 1, h: 1 },
    { i: "21", x: 0, y: 4, w: 1, h: 1 },
    { i: "22", x: 2, y: 4, w: 1, h: 1 },
    { i: "23", x: 4, y: 4, w: 1, h: 1 },
    { i: "24", x: 6, y: 4, w: 1, h: 1 },
    { i: "25", x: 8, y: 4, w: 1, h: 1 },
  ];

  const priorities = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
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
    <GridLayout
      className="layout"
      layout={layout}
      cols={10}
      rowHeight={50}
      width={500}
      isResizable={false}
      isDraggable={false}
    >
       {layout.map(({ i }) => (
          <div key={i} style={itemStyle(i)}>Table {i.replace("table", "")}</div>
           ))}
    </GridLayout>
  );
}  