import React, { useState } from "react";
import { Map } from "./map";

export function Location() {


    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h1>Location</h1>
            <p>Voici notre emplacement sur la carte :</p>
            <Map/>
            
        </div>
    );
}
