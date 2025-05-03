import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type CarbonChartWeekProps = {
  data: [string, number, Date][];
};

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 text-white p-2 rounded-md shadow-md">
        <p>{`Carbon: ${payload[0].value} kg CO₂`}</p>
      </div>
    );
  }
  return null;
};

export default function CarbonChartWeek({ data }: CarbonChartWeekProps) {
  // Get today's date and the last 7 days
  const today = new Date();
  const pastWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
  }).reverse(); // Ensure correct chronological order

  // Aggregate carbon usage per day
  const dailyUsage = pastWeek.map((day) => ({
    day: day.split("-").slice(1).join("/"), // Format "MM/DD"
    carbon: data
      .filter(([_, amount, date]) => {
        const entryDate = new Date(date);
        const localDate = entryDate.toLocaleDateString("en-CA"); // "YYYY-MM-DD" in local time
        return localDate === day;
      })
      .reduce((sum, [_, amount]) => +(sum + amount).toFixed(2), 0),
  }));

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg w-3/4">
      <h2 className="text-xl font-bold mb-4">Carbon Usage (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dailyUsage}>
          <XAxis dataKey="day" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="carbon" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
