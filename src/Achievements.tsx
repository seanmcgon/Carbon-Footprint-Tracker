import { useState } from "react";

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

export default function Achievements() {
  // Log first activity, log 10, log 50, 100
  // Log an activity in every category, try 5 different activities
  // 20 public transit (bus or train)
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("logs");
    return stored ? JSON.parse(stored) : [];
  });

  function logX(x: number) {
    return Math.min(data.length / x, 1);
  }

  function allCats() {
    const cats: string[] = [];
    data.forEach((log: [string, number, Date]) => {
      if (
        activityCategoryMap[log[0]] &&
        !cats.includes(activityCategoryMap[log[0]])
      ) {
        cats.push(activityCategoryMap[log[0]]);
      }
      if (cats.length === 5) {
        return 1;
      }
    });
    return Math.min(cats.length / 5, 1);
  }

  function tenDif() {
    const acts: string[] = [];
    data.forEach((log: [string, number, Date]) => {
      if (!acts.includes(log[0])) {
        acts.push(log[0]);
      }
      if (acts.length === 10) {
        return 1;
      }
    });
    return Math.min(acts.length / 10, 1);
  }

  function pubTrans() {
    let count = 0;
    data.forEach((log: [string, number, Date]) => {
      if (log[0] === "Bus" || log[0] === "Train") {
        count++;
      }
      if (count === 20) {
        return 1;
      }
    });
    return Math.min(count / 20, 1);
  }

  const achievements: [string, string, () => number][] = [
    ["First Step", "Log your first activity", () => logX(1)],
    ["Eco Enthusiast", "Log 10 activities", () => logX(10)],
    ["Sustainability Pro", "Log 50 activities", () => logX(50)],
    ["Green Warrior", "Log 100 activities", () => logX(100)],
    ["Well-Rounded", "Log an activity in all categories", allCats],
    ["Eco Explorer", "Log 10 different activity types", tenDif],
    ["Public Transit Champ", "Log 20 bus or train rides", pubTrans],
  ];

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white min-h-screen">
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold mb-4">Achievements</h1>
        <ul className="space-y-4">
          {achievements.map(([name, description, progress]) => (
            <li key={name} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <strong className="block text-xl mb-2 text-green-400">
                {name}
              </strong>
              <span>{description}</span>
              <div className="flex flex-row">
                <div className="w-13/16 bg-gray-300 rounded-full h-2.5 mt-6 mr-6">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress() * 100}%` }}
                  ></div>
                </div>
                {progress() === 1 && (
                  <strong className="block text-xl mb-2 text-green-400">
                    Completed!
                  </strong>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
