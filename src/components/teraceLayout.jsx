import React, { useState } from "react";
import GridLayout from "react-grid-layout";

export function TerraceLayout() {
  // État pour stocker la disposition actuelle des tables
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
            {/* Tables */}
       
            <div key="1" style={itemStyle}>Table 1</div>
            <div key="2" style={itemStyle}>Table 2</div>
            <div key="3" style={itemStyle}>Table 3</div>
            <div key="4" style={itemStyle}>Table 4</div>
            <div key="5" style={itemStyle}>Table 5</div>
            <div key="6" style={itemStyle}>Table 6</div>
            <div key="7" style={itemStyle}>Table 7</div>
            <div key="8" style={itemStyle}>Table 8</div>
            <div key="9" style={itemStyle}>Table 9</div>
            <div key="10" style={itemStyle}>Table 10</div>
            <div key="11" style={itemStyle}>Table 11</div>
            <div key="12" style={itemStyle}>Table 12</div>
            <div key="13" style={itemStyle}>Table 13</div>
            <div key="14" style={itemStyle}>Table 14</div>
            <div key="15" style={itemStyle}>Table 15</div>
            <div key="16" style={itemStyle}>Table 16</div>
            <div key="17" style={itemStyle}>Table 17</div>
            <div key="18" style={itemStyle}>Table 18</div>
            <div key="19" style={itemStyle}>Table 19</div>
            <div key="20" style={itemStyle}>Table 20</div>
      </GridLayout>
    </div>
  );
}
