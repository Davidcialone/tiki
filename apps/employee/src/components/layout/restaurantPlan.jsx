import React, { useState, useEffect, useRef } from 'react';
import { useZones } from '../../hooks/useZones';

export function RestaurantPlan({ onZonesUpdate }) {
  const canvasRef = useRef(null);

  const {zones, setZones} = useZones();

  console.log(zones);

  const toggleZone = (index) => {
    const newZones = [...zones];
    newZones[index].isOpen = !newZones[index].isOpen;
    setZones(newZones);
    onZonesUpdate(newZones);
  };

  const darkenColor = (color) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${Math.round(r * 0.6)}, ${Math.round(g * 0.6)}, ${Math.round(b * 0.6)})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    zones.forEach(zone => {
      ctx.fillStyle = zone.isOpen ? zone.baseColor : darkenColor(zone.baseColor);
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
      
      ctx.fillStyle = 'black';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(zone.name, zone.x + zone.width / 2, zone.y + 25);
      
      ctx.font = '14px Arial';
      ctx.fillText(`Capacité : ${zone.capacity}`, zone.x + zone.width / 2, zone.y + zone.height / 2);
      ctx.fillText(`Tables : ${zone.tables.length}`, zone.x + zone.width / 2, zone.y + zone.height / 2 + 20);
      
      ctx.fillStyle = zone.isOpen ? 'green' : 'red';
      ctx.fillText(zone.isOpen ? 'OUVERT' : 'FERMÉ', zone.x + zone.width / 2, zone.y + zone.height / 2 + 40);
    });
  }, [zones]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Plan du Restaurant</h2>
      
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {zones.map((zone, index) => (
          <div key={zone.name} className="flex items-center space-x-2">
            <input type="checkbox" id={`zone-${index}`} checked={zone.isOpen} onChange={() => toggleZone(index)} className="mr-2" />
            <label htmlFor={`zone-${index}`} className="cursor-pointer font-medium">
              {zone.name} <span className={`ml-2 text-sm ${zone.isOpen ? 'text-green-600' : 'text-red-600'}`}>({zone.isOpen ? 'Ouvert' : 'Fermé'})</span>
            </label>
          </div>
        ))}
      </div>

      <canvas ref={canvasRef} width={1000} height={500} className="border border-gray-300" />
    </div>
  );
};

export default RestaurantPlan;
