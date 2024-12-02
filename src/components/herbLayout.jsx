import React from "react";
import GridLayout from "react-grid-layout";

export function HerbeLayout() {
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

  // Styles généraux
  const layoutStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "#8FBC8F", // Couleur herbe
    border: "1px solid #ccc",
  };

  const itemStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #999",
    borderRadius: "4px",
    background: "#e0e0e0",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
  };

  const treeStyle = {
    ...itemStyle,
    background: "#072A16", // Couleur sombre pour les arbres
    color: "white",
  };

  return (
    <div style={layoutStyle}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={10} // Nombre de colonnes
        rowHeight={50} // Hauteur de chaque rangée
        width={500} // Largeur totale de la grille
        isResizable={false} // Pas de redimensionnement
        isDraggable={false} // Pas de déplacement
      >
        {/* Tables */}
        <div key="table1" style={itemStyle}>Table 1</div>
        <div key="table2" style={itemStyle}>
          Table 2
        </div>
        <div key="table3" style={itemStyle}>
          Table 3
        </div>
        <div key="table4" style={itemStyle}>
          Table 4
        </div>
        <div key="table5" style={itemStyle}>
          Table 5
        </div>
        <div key="table6" style={itemStyle}>
          Table 6
        </div>

        {/* Arbres */}
        <div key="tree1" style={treeStyle}>
          Arbre 1
        </div>
        <div key="tree2" style={treeStyle}>
          Arbre 2
        </div>
        <div key="tree3" style={treeStyle}>
          Arbre 3
        </div>
        <div key="tree4" style={treeStyle}>
          Arbre 4
        </div>
      </GridLayout>
    </div>
  );
}
