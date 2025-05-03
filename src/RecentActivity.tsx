type RecentActivityProps = {
  logs: [string, number, Date][];
  updateLogs: (logs: [string, number, Date][]) => void;
};

export default function RecentActivity({
  logs,
  updateLogs,
}: RecentActivityProps) {
  return (
    <div className="bg-gray-600 rounded-lg p-6 w-full md:w-4/12 md:min-h-9/12 text-white m-6 shadow-lg flex flex-col items-center">
      <p className="mb-4 text-2xl text-center font-bold">Recent Activity</p>
      <ol className="space-y-4 overflow-y-auto max-h-96 w-full">
        {logs
          .slice()
          .reverse()
          .slice(0, 10)
          .map((log, index) => (
            <li
              key={index}
              className="bg-gray-700 p-4 rounded-lg shadow-md w-full"
            >
              <div className="flex flex-row justify-between">
                <p className="text-lg">{log[0] + ": " + log[1] + " kg CO₂"}</p>
                <p className="text-sm text-gray-400">
                  {new Date(log[2]).toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
            </li>
          ))}
      </ol>
      {logs.length !== 0 && (
        <>
          <button
            onClick={() => updateLogs([])}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear ALL Activity
          </button>
          <p className="mt-2 text-sm text-gray-300">(This cannot be undone)</p>
        </>
      )}
      {logs.length === 0 && (
        <p className="mt-2 text-sm text-gray-300">No activities logged</p>
      )}
    </div>
  );
}
