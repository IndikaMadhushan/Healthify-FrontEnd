import {
  Calendar,
  Pill,
  CalendarCheck,
  Droplet,
  FolderOpen,
} from "lucide-react";

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "today", label: "Today", icon: Calendar },
    { id: "medicine", label: "Medicine", icon: Pill },
    { id: "appointment", label: "Appointment", icon: CalendarCheck },
    { id: "period", label: "Period", icon: Droplet },
    { id: "other", label: "Other", icon: FolderOpen },
  ];

  return (
    <div className="bg-white rounded-lg sm:rounded-full shadow-md p-2 sm:p-2 flex flex-wrap sm:flex-nowrap justify-start sm:justify-between mb-6 sm:mb-8 border border-black/20 gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 lg:px-6 sm:py-3 rounded-full border transition-all duration-300 text-xs sm:text-sm lg:text-base flex-1 sm:flex-initial min-w-0
              ${
                activeTab === tab.id
                  ? "bg-white text-teal-600 border-teal-500 shadow hover:border-teal-500"
                  : "bg-white text-gray-700 border-transparent hover:text-teal-500 hover:bg-teal-50 hover:border-teal-400"
              }`}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="whitespace-nowrap truncate">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
