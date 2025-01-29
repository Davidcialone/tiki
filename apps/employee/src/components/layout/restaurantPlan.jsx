import React, { useState, useEffect, useRef } from 'react';

export function RestaurantPlan ()  {
  const canvasRef = useRef(null);
  
  const [zones, setZones] = useState([
    {
      name: "Terrasse",
      capacity: 50,
      x: 200,
      y: 0,
      width: 200,
      height: 250,
      baseColor: 'lightgreen',
      isOpen: true,
      tables: []
    },
    {
      name: "Herbe",
      capacity: 10,
      x: 0,
      y: 0,
      width: 200,
      height: 100,
      baseColor: 'lightblue',
      isOpen: true,
      tables: []
    },
    {
      name: "Inside",
      capacity: 60,
      x: 400,
      y: 0,
      width: 300,
      height: 250,
      baseColor: 'lightyellow',
      isOpen: true,
      tables: []
    },
    {
      name: "Gravel",
      capacity: 40,
      x: 200,
      y: 300,
      width: 200,
      height: 200,
      baseColor: 'lightcoral',
      isOpen: true,
      tables: []
    },
    {
      name: "Terrasse 2",
      capacity: 30,
      x: 700,
      y: 0,
      width: 300,
      height: 200,
      baseColor: 'lightpink',
      isOpen: true,
      tables: []
    },
    {
      name: "Bar",
      capacity: 20,
      x: 450,
      y: 300,
      width: 250,
      height: 100,
      baseColor: 'peachpuff',
      isOpen: true,
      tables: []
    }
  ]);

  const toggleZone = (index) => {
    const newZones = [...zones];
    newZones[index].isOpen = !newZones[index].isOpen;
    setZones(newZones);
  };

  // Fonction pour assombrir une couleur
  const darkenColor = (color) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    const darkenFactor = 0.6; // Facteur d'assombrissement (0 = noir, 1 = couleur originale)
    return `rgb(${Math.round(r * darkenFactor)}, ${Math.round(g * darkenFactor)}, ${Math.round(b * darkenFactor)})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawZone = (zone) => {
      ctx.save();
      
      // Remplir la zone avec la couleur appropriée
      if (zone.isOpen) {
        ctx.fillStyle = zone.baseColor;
      } else {
        ctx.fillStyle = darkenColor(zone.baseColor);
      }
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height);

      // Bordure de la zone
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);

      // Nom de la zone
      ctx.fillStyle = 'black';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(zone.name, zone.x + zone.width / 2, zone.y + 25);

      // Informations de la zone
      ctx.font = '14px Arial';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = zone.isOpen ? 'black' : 'rgba(0, 0, 0, 0.7)';
      ctx.fillText(
        `Capacité : ${zone.capacity}`,
        zone.x + zone.width / 2,
        zone.y + zone.height / 2
      );
      ctx.fillText(
        `Tables disponibles : ${zone.tables.length}`,
        zone.x + zone.width / 2,
        zone.y + zone.height / 2 + 20
      );
      
      // État de la zone
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = zone.isOpen ? 'green' : 'red';
      ctx.fillText(
        zone.isOpen ? 'OUVERT' : 'FERMÉ',
        zone.x + zone.width / 2,
        zone.y + zone.height / 2 + 40
      );

      // Tables
      zone.tables.forEach(table => {
        ctx.fillStyle = zone.isOpen ? 'brown' : '#4a3728';
        ctx.beginPath();
        ctx.arc(zone.x + table.x, zone.y + table.y, table.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
      });

      ctx.restore();
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    zones.forEach(drawZone);
  }, [zones]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Plan du Restaurant</h2>
      
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {zones.map((zone, index) => (
          <div key={zone.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`zone-${index}`}
              checked={zone.isOpen}
              onChange={() => toggleZone(index)}
              className="mr-2"
            />
            <label htmlFor={`zone-${index}`} className="flex items-center cursor-pointer">
              <span className="font-medium">{zone.name}</span>
              <span className={`ml-2 text-sm ${zone.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                ({zone.isOpen ? 'Ouvert' : 'Fermé'})
              </span>
            </label>
          </div>
        ))}
      </div>

      <canvas
        ref={canvasRef}
        width={1000}
        height={500}
        className="border border-gray-300"
      />
    </div>
  );
};

export default RestaurantPlan;