import React, { useState } from "react";
import { Calendar, Droplet } from "lucide-react";

export default function PeriodSection() {
  const [periodDate, setPeriodDate] = useState("2025-10-23");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl text-black font-semibold mb-6">
          Period Tracker
        </h2>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-teal-500 text-white rounded-lg p-4 text-center">
            <div className="text-sm">Your Next period date</div>
            <div className="text-xl font-bold">{periodDate}</div>
          </div>
          <div className="flex-1 border-2 border-pink-300 rounded-lg p-4 text-center flex items-center justify-center">
            <Droplet className="text-pink-400 w-6 h-6 mr-2" />
            <span className="text-pink-500 font-semibold">
              Today is the day
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-4 text-black">Change the Date</h3>
          <div className="flex gap-1 sm:gap-2 mb-2 overflow-x-auto pb-2">
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month) => (
              <button
                key={month}
                className="px-3 sm:px-4 py-2 border rounded border-teal-500 text-black bg-white hover:bg-gray-50 flex-shrink-0 text-sm sm:text-base"
              >
                {month}
              </button>
            ))}
          </div>

          <input
            type="date"
            className="bg-white [color-scheme:light] text-black w-full border rounded px-3 py-2 mb-4"
            value={periodDate}
            onChange={(e) => setPeriodDate(e.target.value)}
          />
          <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600">
            Update Date
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg text-black font-semibold mb-4">
          Period History
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center border rounded-lg p-4">
              <Calendar className="w-5 h-5 mr-3 text-gray-500" />
              <span className="text-black">Period on 2025-09-23</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
