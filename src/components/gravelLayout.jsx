import React, { useState } from "react";
import GridLayout from "react-grid-layout";

export function GravelLayout() {

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
            </GridLayout>
        </div>
    );
}