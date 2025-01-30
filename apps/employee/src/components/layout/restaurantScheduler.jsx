import React, { useState, useEffect } from 'react';
import { Sun, Moon, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useZones } from '../../hooks/useZones';

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

const getWeekDates = (startDate) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const formatDate = (date) => {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

export function RestaurantScheduler () {
  const { zones = [] } = useZones();
  const [selectedZones, setSelectedZones] = useState([]);
  const [schedules, setSchedules] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState('midi');
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    // Trouver le lundi de la semaine courante
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  });

  const weekDates = getWeekDates(currentWeekStart);

  // Format de la clé de date: "YYYY-MM-DD"
  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    setSchedules(prev => {
      const newSchedules = { ...prev };
      selectedZones.forEach(zoneName => {
        if (!newSchedules[zoneName]) {
          newSchedules[zoneName] = weekDates.reduce((acc, date) => {
            const dateKey = formatDateKey(date);
            acc[dateKey] = { midi: false, soir: false };
            return acc;
          }, {});
        }
      });
      return newSchedules;
    });
  }, [selectedZones, currentWeekStart]);

  const toggleZoneSelection = (zoneName) => {
    setSelectedZones(prev =>
      prev.includes(zoneName) ? prev.filter(z => z !== zoneName) : [...prev, zoneName]
    );
  };

  const togglePeriod = (zoneName, date, period) => {
    const dateKey = formatDateKey(date);
    setSchedules(prev => ({
      ...prev,
      [zoneName]: {
        ...prev[zoneName],
        [dateKey]: { 
          ...prev[zoneName]?.[dateKey] || { midi: false, soir: false },
          [period]: !(prev[zoneName]?.[dateKey]?.[period] || false)
        }
      }
    }));
  };

  const getZoneStatus = (zoneName, date, period) => {
    const dateKey = formatDateKey(date);
    return schedules[zoneName]?.[dateKey]?.[period] || false;
  };

  const getTotalCapacity = (date, period) => {
    return selectedZones
      .filter(zoneName => getZoneStatus(zoneName, date, period))
      .reduce((total, zoneName) => {
        const zone = zones.find(z => z.name === zoneName);
        return total + (zone?.capacity || 0);
      }, 0);
  };

  const changeWeek = (offset) => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (offset * 7));
      return newDate;
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Gestion des horaires</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeWeek(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium text-black">
              Semaine du {formatDate(currentWeekStart)}
            </span>
            <button
              onClick={() => changeWeek(1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setSelectedPeriod('midi')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedPeriod === 'midi' 
                ? 'bg-blue-100 text-blue-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            <Sun className="w-5 h-5" />
            <span>Midi</span>
          </button>
          <button
            onClick={() => setSelectedPeriod('soir')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedPeriod === 'soir' 
                ? 'bg-blue-100 text-blue-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            <Moon className="w-5 h-5" />
            <span>Soir</span>
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {zones.map(zone => (
            <button
              key={zone.name}
              onClick={() => toggleZoneSelection(zone.name)}
              className={`p-4 rounded-lg transition-all duration-200 flex flex-col ${
                selectedZones.includes(zone.name)
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 hover:border-blue-500 hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">{zone.name}</span>
              <div className="flex items-center gap-1 mt-1 text-sm opacity-80">
                <Users className="w-4 h-4" />
                <span>{zone.capacity} places</span>
              </div>
            </button>
          ))}
        </div>

        {selectedZones.length > 0 && (
          <div className="overflow-x-auto mt-6 rounded-lg border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Jour</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Date</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Zones ouvertes</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Capacité</th>
                </tr>
              </thead>
              <tbody>
                {weekDays.map((day, index) => (
                  <tr key={day} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700">{day}</td>
                    <td className="py-4 px-4 text-gray-600">{formatDate(weekDates[index])}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedZones.map(zoneName => {
                          const zone = zones.find(z => z.name === zoneName);
                          return (
                            <button
                              key={zoneName}
                              onClick={() => togglePeriod(zoneName, weekDates[index], selectedPeriod)}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                getZoneStatus(zoneName, weekDates[index], selectedPeriod)
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {zone.name} ({zone.capacity})
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4" />
                        <span>{getTotalCapacity(weekDates[index], selectedPeriod)} places</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

