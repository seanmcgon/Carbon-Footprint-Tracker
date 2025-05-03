import ActivityLogger from "./ActivityLogger";
import RecentActivity from "./RecentActivity";
import { useEffect, useState } from "react";

export default function ActivityPage() {
  const [logs, setLogs] = useState(() => {
    const stored = localStorage.getItem("logs");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  return (
    <div className="flex flex-col w-full items-center md:items-stretch md:flex-row min-h-10/12 justify-center gap-10 md:gap-20 p-4">
      <ActivityLogger logs={logs} updateLogs={setLogs} />
      <RecentActivity logs={logs} updateLogs={setLogs} />
    </div>
  );
}
