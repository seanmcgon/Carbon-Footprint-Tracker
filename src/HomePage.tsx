import footprint from "./assets/footprint.png";
import Tile from "./Tile";

// Do feature #s 1, 2, 5, 6, 7
const features = [
  "Log Activity",
  "Dashboard",
  "Tips + Resources",
  "Achievements",
];

export default function HomePage() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-baseline text-white">
      <div className="mb-4">
        <img
          src={footprint}
          className="mx-auto h-60 p-6 transition-filter duration-300 ease-in-out hover:filter hover:drop-shadow-[0_0_2em_#646cffaa]"
          alt="Footprint logo"
        />
      </div>
      <h1 className="text-6xl font-bold mb-8 text-center">
        Carbon Footprint Tracker
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <Tile key={feature} title={feature} />
        ))}
      </div>
    </div>
  );
}
