import React, { useState } from "react";
import { DayView } from "./dayViews";
import { WeekView } from "./weekView";
import { MonthView } from "./monthView";

export function PlanningPage() {
  const [view, setView] = useState("day"); // "day", "week", or "month"

  const handleViewChange = (view) => {
    setView(view);
  };

  return (
    <div className="p-6 mt-16 bg-gray-100 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 text-center">Planning des Employés</h2>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handleViewChange("day")}
          className={`px-4 py-2 mx-2 ${view === "day" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
        >
          Jour
        </button>
        <button
          onClick={() => handleViewChange("week")}
          className={`px-4 py-2 mx-2 ${view === "week" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
        >
          Semaine
        </button>
        <button
          onClick={() => handleViewChange("month")}
          className={`px-4 py-2 mx-2 ${view === "month" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
        >
          Mois
        </button>
      </div>

      {/* Display the respective view */}
      <div className="mt-8">
        {view === "day" && <DayView />}
        {view === "week" && <WeekView />}
        {view === "month" && <MonthView />}
      </div>
    </div>
  );
}
