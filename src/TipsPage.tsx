const tips: Record<string, string[][]> = {
  "Everyday Sustainable Habits": [
    [
      "Reduce Single-Use Plastics",
      "Use reusable bags, water bottles, and containers.",
    ],
    [
      "Switch to Energy-Efficient Appliances",
      "Look for ENERGY STAR-rated devices.",
    ],
    ["Unplug Devices When Not in Use", "Reduces phantom energy consumption."],
    [
      "Opt for Public Transport, Biking, or Walking",
      "Cuts down on carbon emissions from personal vehicles.",
    ],
    [
      "Eat More Plant-Based Meals",
      "Reduces the carbon footprint from meat production.",
    ],
    [
      "Buy Secondhand",
      "Clothing, furniture, and electronics can often be found secondhand.",
    ],
    [
      "Recycle & Compost",
      "Follow your local recycling guidelines and compost food waste.",
    ],
    [
      "Conserve Water",
      "Fix leaks, take shorter showers, and use water-efficient fixtures.",
    ],
    [
      "Support Sustainable Brands",
      "Research companies that prioritize sustainability.",
    ],
    [
      "Reduce Fast Fashion Purchases",
      "Invest in quality, long-lasting clothing.",
    ],
  ],
  "Home & Energy Efficiency": [
    ["Use LED Bulbs", "They last longer and consume less power."],
    ["Install a Smart Thermostat", "Helps regulate temperature efficiently."],
    ["Improve Home Insulation", "Reduces heating/cooling energy needs."],
    ["Wash Clothes in Cold Water", "Saves energy and preserves fabrics."],
    ["Line Dry Clothes", "Reduces dryer energy consumption."],
  ],
  "Sustainable Shopping & Consumption": [
    ["Choose Local & Seasonal Foods", "Reduces transportation emissions."],
    [
      "Avoid Over-Packaged Products",
      "Choose items with minimal or compostable packaging.",
    ],
    [
      "Bring Your Own Containers",
      "Use reusable bags, coffee cups, and food containers.",
    ],
    [
      "Consider Eco-Friendly Banking",
      "Some banks invest in fossil fuels, while others focus on sustainability.",
    ],
  ],
};

const resources = [
  ["Carbon Footprint Calculator", "https://www.footprintcalculator.org/", ""],
  [
    "Good On You",
    "https://goodonyou.eco/",
    "Sustainable shopping guide & ethical fashion ratings",
  ],
  [
    "Earth911",
    "https://earth911.com/",
    "Environmental news & action, recycling & sustainability guides",
  ],
  ["Going Zero Waste", "https://www.goingzerowaste.com/", "Zero waste tips"],
];

export default function TipsPage() {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white min-h-screen">
      {Object.entries(tips).map(([category, curTips]) => (
        <div key={category} className="w-full max-w-4xl mb-8">
          <h1 className="text-3xl font-bold mb-4">{category}</h1>
          <ul className="space-y-4">
            {curTips.map(([tip, description], index) => (
              <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <strong className="block text-xl mb-2 text-green-400">
                  {tip}:
                </strong>
                <span>{description}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold mb-4">Additional Resources</h1>
        <ul className="space-y-4">
          {resources.map(([title, link, description]) => (
            <li key={title} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <strong className="block text-xl mb-2 text-green-400">
                <a
                  href={link}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </a>
              </strong>
              <span>{description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
