import React from "react";
import GridLayout from "react-grid-layout";
import { useReservations } from "../../../../client/src/reservationContext";

export function HerbeLayout() {
  const { reservedTables, setReservedTables } = useReservations();

  // Configuration des tables et arbres pour la zone Herbe
  const layout = [
    { i: "table1", x: 0, y: 0, w: 1, h: 1 }, // Table 1
    { i: "table2", x: 2, y: 0, w: 1, h: 1 }, // Table 2
    { i: "table3", x: 3, y: 0, w: 1, h: 1 }, // Table 3
    { i: "table4", x: 5, y: 0, w: 1, h: 1 }, // Table 4
    { i: "table5", x: 6, y: 0, w: 1, h: 1 }, // Table 5
    { i: "table6", x: 8, y: 0, w: 1, h: 1 }, // Table 6
    { i: "tree1", x: 1, y: 0, w: 1, h: 1 },  // Arbre 1
    { i: "tree2", x: 4, y: 0, w: 1, h: 1 },  // Arbre 2
    { i: "tree3", x: 7, y: 0, w: 1, h: 1 },  // Arbre 3
    { i: "tree4", x: 9, y: 0, w: 1, h: 1 },  // Arbre 4
  ];

  const reserveTables = (numGuests) => {
    const tableIds = layout
      .filter((item) => item.i.startsWith("table")) // Ne considérer que les tables
      .map((item) => item.i);

    const availableTables = tableIds.filter((table) => !reservedTables.includes(table));
    const tablesToReserve = availableTables.slice(0, numGuests);

    if (tablesToReserve.length < numGuests) {
      alert("Pas assez de tables disponibles.");
      return;
    }

    setReservedTables((prev) => [...prev, ...tablesToReserve]);
    alert(`Tables réservées : ${tablesToReserve.join(", ")}`);
  };

  const itemStyle = (id) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: reservedTables.includes(id) ? "4px solid #FF0000" : "2px solid black",
    borderRadius: "6px",
    background: reservedTables.includes(id) ? "#f77" : "#e0e0e0",
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

  const treeStyle = {
    background: "#072A16", // Couleur sombre pour les arbres
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.8rem",
    fontWeight: "bold",
    borderRadius: "50%",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={10}
        rowHeight={50}
        width={500}
        isResizable={false}
        isDraggable={false}
      >
        {layout.map(({ i }) =>
          i.startsWith("table") ? (
            <div key={i} style={itemStyle(i)}>
              {i.replace("table", "Table ")}
            </div>
          ) : (
            <div key={i} style={treeStyle}>
              🌳
            </div>
          )
        )}
      </GridLayout>
    </div>
  );
}
