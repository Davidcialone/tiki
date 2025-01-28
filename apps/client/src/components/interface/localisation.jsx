import React from "react";
import { Map } from "./map";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export function Location() {
  const address = "Chemin du Pontet, 69150 Décines-Charpieu";
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <MapPin className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nous rendre visite
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Facilement accessible depuis le centre-ville, notre établissement vous accueille dans un cadre chaleureux et convivial.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Container */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Map />
          </div>

          {/* Address Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Notre adresse
              </h2>
              
              <div className="space-y-6">
                {/* Address Card */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-lg text-gray-700 font-medium mb-4">
                    {address}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCopyAddress}
                      className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Copier l'adresse
                    </button>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Navigation className="w-4 h-4" />
                      Itinéraire
                    </a>
                  </div>
                </div>

                {/* Horaires
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Horaires d'ouverture
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Lundi - Vendredi : 11h00 - 22h00</p>
                    <p>Samedi : 11h00 - 23h00</p>
                    <p>Dimanche : 11h00 - 21h00</p>
                  </div>
                </div> */}

                {/* Transports
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Accès
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>🚇 Métro : Ligne A - Station Décines Grand Large</p>
                    <p>🚌 Bus : Lignes 16, 67 - Arrêt Pontet</p>
                    <p>🚗 Parking gratuit sur place</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}