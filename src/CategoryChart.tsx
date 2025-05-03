import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type CarbonChartWeekProps = {
  data: [string, number, Date][];
};

const activityCategoryMap: Record<string, string> = {
  "Gas Car": "Transportation",
  "Hybrid Car": "Transportation",
  "EV Car": "Transportation",
  Bus: "Transportation",
  Train: "Transportation",
  Plane: "Transportation",
  "Incandescent 60W Bulb": "Home Energy",
  "LED Bulb": "Home Energy",
  "Air Conditioner": "Home Energy",
  "Electric Heater": "Home Energy",
  "Laundry (Washing Machine)": "Home Energy",
  Dryer: "Home Energy",
  Computer: "Home Energy",
  Beef: "Food",
  Chicken: "Food",
  Eggs: "Food",
  Dairy: "Food",
  Lentils: "Food",
  Rice: "Food",
  "New Clothes": "Shopping/Consumption",
  Electronics: "Shopping/Consumption",
  "Streaming Video": "Shopping/Consumption",
  Shower: "Water Usage",
  Bath: "Water Usage",
  "Flush Toilet": "Water Usage",
};

const COLORS = [
  "#2dcfff",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a28cd3",
  "#ff2d2d",
];

export default function CategoryChart({ data }: CarbonChartWeekProps) {
  const categoryTotals = data.reduce(
    (acc: Record<string, number>, [activity, amount]) => {
      const category = activityCategoryMap[activity] || "Other";
      acc[category] = +((acc[category] || 0) + amount).toFixed(2);
      return acc;
    },
    {}
  );

  const pieChartData = Object.entries(categoryTotals).map(
    ([category, value]) => ({
      name: category,
      value,
    })
  );

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 text-white p-2 rounded-md shadow-md">
          <p className="font-bold">{payload[0].name}</p>
          <p>Carbon: {payload[0].value} kg CO₂</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center pt-6 bg-gray-800 rounded-lg p-6 w-3/4 text-white m-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Carbon Footprint by Category
      </h2>
      {data.length !== 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
              labelLine={false}
              outerRadius="82%"
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      )}
      {data.length === 0 && (
        <p className="mt-2 text-sm text-gray-300">No activities logged</p>
      )}
    </div>
  );
}
