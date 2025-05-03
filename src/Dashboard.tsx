import { useState } from "react";
import CarbonChartWeek from "./CarbonChartWeek";
import CategoryChart from "./CategoryChart";

export default function Dashboard() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("logs");
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <>
      <div className="flex flex-col md:flex-row text-white justify-center gap-10 md:gap-20 p-4">
        <div className="mb-4 text-center lg:text-left flex flex-col lg:flex-row lg:items-baseline">
          <p className="text-2xl font-bold md:pr-3">Total Activities Logged: </p>
          <p className="text-6xl md:text-8xl text-blue-500 font-bold">
            {data.length}
          </p>
        </div>
        <div className="mb-4 text-center lg:text-left flex flex-col lg:flex-row lg:items-baseline">
          <p className="text-2xl font-bold md:pr-3">Total Carbon Footprint: </p>
          <p className="text-6xl md:text-8xl text-green-400 font-bold">
            {data.reduce((sum: number, log: [string, number, Date]) => {
              return +(sum + log[1]).toFixed(2);
            }, 0)}{" "}
            <span className="text-4xl">kg CO₂</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <CarbonChartWeek data={data}></CarbonChartWeek>
        <CategoryChart data={data}></CategoryChart>
      </div>
    </>
  );
}
