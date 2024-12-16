import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export const Map = ({ 
  restaurantLat = 45.77934190977336,
  restaurantLng = 4.980531271165121,
  restaurantName = 'TIKI au bord de l\'eau',
  zoom = 15
}) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [geolocationError, setGeolocationError] = useState(null);

  // Fonction pour ouvrir l'application de navigation
  const openMapsNavigation = () => {
    if (!userLocation) {
      alert('Impossible de déterminer votre position actuelle.');
      return;
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    let navigationUrl = '';

    if (isIOS) {
      navigationUrl = `maps://?saddr=${userLocation.lat},${userLocation.lng}&daddr=${restaurantLat},${restaurantLng}&dirflg=d`;
    } else if (isAndroid) {
      navigationUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${restaurantLat},${restaurantLng}&destination_name=${encodeURIComponent(restaurantName)}`;
    } else {
      navigationUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${restaurantLat},${restaurantLng}&destination_name=${encodeURIComponent(restaurantName)}`;
    }

    window.open(navigationUrl, '_blank');
  };

  useEffect(() => {
    if (mapRef.current && !mapRef.current._leaflet_map) {
      const map = L.map('map').setView([restaurantLat, restaurantLng], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Marqueur pour le restaurant
      L.marker([restaurantLat, restaurantLng])
        .addTo(map)
        .bindPopup(restaurantName)
        .openPopup();

      mapRef.current._leaflet_map = map;

      // Localisation de l'utilisateur
      map.locate({
        setView: false,
        maxZoom: zoom,
        timeout: 10000,
        enableHighAccuracy: true
      });

      map.on('locationfound', (e) => {
        // Ajouter le marqueur pour l'utilisateur
        const userMarker = L.marker(e.latlng, {
          icon: L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: iconShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })
        }).addTo(map);

        userMarker.bindPopup('Votre position').openPopup();

        // Mettre à jour l'état avec la position de l'utilisateur
        setUserLocation({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });

        // Ajuster les limites pour inclure les deux points
        const bounds = L.latLngBounds([
          [restaurantLat, restaurantLng], // Position du restaurant
          [e.latlng.lat, e.latlng.lng]   // Position de l'utilisateur
        ]);
        map.fitBounds(bounds, { padding: [50, 50] }); // Ajouter un peu d'espace autour
      });

      map.on('locationerror', (e) => {
        setGeolocationError(e.message);
      });
    }
  }, [restaurantLat, restaurantLng, zoom, restaurantName]);

  return (
    <div>
      <div 
        id="map" 
        ref={mapRef}
        style={{ 
          height: '400px', 
          width: '100%', 
          backgroundColor: '#f0f0f0' 
        }} 
      />
      {geolocationError && (
        <div style={{ 
          color: 'red', 
          marginTop: '10px', 
          textAlign: 'center' 
        }}>
          Erreur de géolocalisation : {geolocationError}
        </div>
      )}
      {userLocation && (
        <>
          <button 
            onClick={openMapsNavigation}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginTop: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🗺️ Lancer la navigation
          </button>
        </>
      )}
    </div>
  );
};

export default Map;
