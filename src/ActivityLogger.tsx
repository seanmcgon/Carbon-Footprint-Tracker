import { useState } from "react";
import check from "./assets/check.png";

const categories = [
  "Transportation",
  "Home Energy Use",
  "Food Choices",
  "Shopping & Consumption",
  "Water Usage",
];

const activities: Record<string, string[]> = {
  transportation: ["Gas Car", "Hybrid Car", "EV Car", "Bus", "Train", "Plane"],
  home: [
    "Incandescent 60W Bulb",
    "LED Bulb",
    "Air Conditioner",
    "Electric Heater",
    "Laundry (Washing Machine)",
    "Dryer",
    "Computer",
  ],
  food: ["Beef", "Chicken", "Eggs", "Dairy", "Lentils", "Rice"],
  shopping: ["New Clothes", "Electronics", "Streaming Video"],
  water: ["Shower", "Bath", "Flush Toilet"],
};

const quantities: Record<string, [string[], number]> = {
  gas: [["1 mi", "5 mi", "10 mi", "20 mi", "50 mi", "100 mi"], 0.24],
  hybrid: [["1 mi", "5 mi", "10 mi", "20 mi", "50 mi", "100 mi"], 0.12],
  ev: [["1 mi", "5 mi", "10 mi", "20 mi", "50 mi", "100 mi"], 0.05],
  bus: [["1 mi", "5 mi", "10 mi", "20 mi", "50 mi", "100 mi"], 0.1],
  train: [["1 mi", "5 mi", "10 mi", "20 mi", "50 mi", "100 mi"], 0.04],
  plane: [["1 mi", "5 mi", "10 mi", "20 mi", "50 mi", "100 mi"], 0.2],
  incandescent: [["0.25 hr", "0.5 hr", "1 hr", "2 hr", "4 hr", "8 hr"], 0.06],
  led: [["0.25 hr", "0.5 hr", "1 hr", "2 hr", "4 hr", "8 hr"], 0.01],
  air: [["0.25 hr", "0.5 hr", "1 hr", "2 hr", "4 hr", "8 hr"], 1],
  electric: [["0.25 hr", "0.5 hr", "1 hr", "2 hr", "4 hr", "8 hr"], 1.5],
  laundry: [["1 load", "2 loads", "3 loads", "4 loads"], 0.4],
  dryer: [["1 load", "2 loads", "3 loads", "4 loads"], 2],
  computer: [["0.25 hr", "0.5 hr", "1 hr", "2 hr", "4 hr", "8 hr"], 0.05],
  beef: [["50 g", "100 g", "200 g", "500 g", "1000 g"], 0.027],
  chicken: [["50 g", "100 g", "200 g", "500 g", "1000 g"], 0.0069],
  eggs: [["50 g", "100 g", "200 g", "500 g", "1000 g"], 0.0045],
  dairy: [["50 g", "100 g", "200 g", "500 g", "1000 g"], 0.009],
  lentils: [["50 g", "100 g", "200 g", "500 g", "1000 g"], 0.0009],
  rice: [["50 g", "100 g", "200 g", "500 g", "1000 g"], 0.004],
  new: [["1 item", "2 items", "5 items", "10 items"], 17.5],
  electronics: [["1 smartphone", "1 laptop", "1 TV"], 80],
  streaming: [["15 min", "30 min", "1 hr", "2 hr", "4 hr"], 0.2],
  shower: [[], 1],
  bath: [[], 3],
  flush: [[], 0.1],
};

type ActivityLoggerProps = {
  logs: [string, number, Date][];
  updateLogs: (logs: [string, number, Date][]) => void;
};

export default function ActivityLogger({
  logs,
  updateLogs,
}: ActivityLoggerProps) {
  const [category, setCategory] = useState("");
  const [activity, setActivity] = useState("");
  const [total, setTotal] = useState(0);
  const [stage, setStage] = useState(0);

  function submit(curActivity: string, quantity: number) {
    const amount =
      quantities[curActivity.split(" ")[0].toLowerCase()][1] * quantity;
    setTotal(+amount.toFixed(2));

    const value: [string, number, Date] = [
      curActivity,
      +amount.toFixed(2),
      new Date(),
    ];
    const newLogs = [...logs, value];
    updateLogs(newLogs);

    setTimeout(() => {
      setCategory("");
      setActivity("");
      setTotal(0);
      setStage(0);
    }, 3000);
  }

  return (
    <div className="bg-gray-600 rounded-lg p-6 w-full md:w-4/12 md:min-h-9/12 text-white m-6 shadow-lg flex flex-col justify-center">
      <h1 className="text-5xl font-bold mb-6 text-center">Log an Activity</h1>
      <div className="w-full bg-gray-300 rounded-full h-2.5 mb-6">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${stage * 100}%` }}
        ></div>
      </div>
      {category === "" && total === 0 && (
        <>
          <p className="mb-4 text-2xl text-center">Select category:</p>
          <form className="flex justify-center">
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setStage(1 / 3);
              }}
              className="w-full p-4 rounded-lg bg-gray-700 text-white text-xl"
            >
              <option value="" disabled>
                Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </form>
        </>
      )}
      {category !== "" && activity === "" && total === 0 && (
        <>
          <p className="mb-4 text-3xl text-center text-blue-500 font-bold">
            {category}
          </p>
          <p className="mb-4 text-2xl text-center">Select activity:</p>
          <form className="flex justify-center">
            <select
              value={activity}
              onChange={(event) => {
                setActivity(event.target.value);
                setStage(2 / 3);
                if (category === "Water Usage") {
                  setStage(1);
                  submit(event.target.value, 1);
                }
              }}
              className="w-full p-4 rounded-lg bg-gray-700 text-white text-xl"
            >
              <option value="" disabled>
                Activity
              </option>
              {activities[category.split(" ")[0].toLowerCase()].map(
                (activity) => (
                  <option key={activity} value={activity}>
                    {activity}
                  </option>
                )
              )}
            </select>
          </form>
        </>
      )}
      {activity !== "" && category !== "Water Usage" && total === 0 && (
        <>
          <p className="mb-4 text-3xl text-center text-blue-500 font-bold">
            {activity}
          </p>
          <p className="mb-4 text-2xl text-center">Select quantity:</p>
          <form className="flex justify-center">
            <select
              onChange={(event) => {
                setStage(1);
                submit(activity, Number(event.target.value.split(" ")[0]));
              }}
              className="w-full p-4 rounded-lg bg-gray-700 text-white text-xl"
              value=""
            >
              <option value="" disabled>
                Quantity
              </option>
              {quantities[activity.split(" ")[0].toLowerCase()][0].map(
                (quantity) => (
                  <option key={quantity.toString()} value={quantity}>
                    {quantity}
                  </option>
                )
              )}
            </select>
          </form>
        </>
      )}
      {total !== 0 && (
        <>
          <p className="mb-4 text-3xl text-center text-blue-500 font-bold">
            Activity Logged
          </p>
          <p className="mb-4 text-2xl text-center text-green-400 font-bold">
            {activity + ": " + String(total) + " kg CO₂"}
          </p>
          <div className="flex justify-center">
            <img src={check} alt="Green check" className="h-14" />
          </div>
        </>
      )}
    </div>
  );
}
