import React, { useState } from "react";

export function MonthView() {
  const [schedule] = useState({
    "2025-01-01": [
      { time: "08:00", employee: "Alice" },
      { time: "09:00", employee: "Bob" },
    ],
    "2025-01-02": [
      { time: "08:00", employee: "Charlie" },
      { time: "09:00", employee: "David" },
    ],
    // Ajoute les autres jours ici
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Planning du Mois</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(schedule).map((date, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-700">{date}</h4>
            <div className="space-y-2 mt-2">
              {schedule[date].map((slot, idx) => (
                <div key={idx} className="flex justify-between">
                  <p className="text-gray-600">{slot.time}</p>
                  <p className="text-gray-600">{slot.employee}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
