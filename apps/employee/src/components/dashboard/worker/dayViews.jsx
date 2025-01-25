import React, { useState } from "react";

export function DayView() {
  const [schedule] = useState([
    { time: "08:00", employee: "Alice" },
    { time: "09:00", employee: "Bob" },
    { time: "10:00", employee: "Charlie" },
    { time: "11:00", employee: "David" },
    { time: "12:00", employee: "Alice" },
    { time: "13:00", employee: "Bob" },
    { time: "14:00", employee: "Charlie" },
    { time: "15:00", employee: "David" },
  ]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Planning du Jour</h3>
      <div className="space-y-4">
        {schedule.map((slot, index) => (
          <div key={index} className="flex justify-between items-center">
            <p className="text-lg text-gray-700">{slot.time}</p>
            <p className="text-lg text-gray-600">{slot.employee}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
