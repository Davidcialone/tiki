import React, { useState } from "react";

export function WeekView() {
  const [schedule] = useState({
    Monday: [
      { time: "08:00", employee: "Alice" },
      { time: "09:00", employee: "Bob" },
    ],
    Tuesday: [
      { time: "08:00", employee: "Charlie" },
      { time: "09:00", employee: "David" },
    ],
    Wednesday: [
      { time: "08:00", employee: "Alice" },
      { time: "09:00", employee: "Bob" },
    ],
    Thursday: [
      { time: "08:00", employee: "Charlie" },
      { time: "09:00", employee: "David" },
    ],
    Friday: [
      { time: "08:00", employee: "Alice" },
      { time: "09:00", employee: "Bob" },
    ],
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Planning de la Semaine</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(schedule).map((day, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-700">{day}</h4>
            <div className="space-y-2 mt-2">
              {schedule[day].map((slot, idx) => (
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
