import home from "./assets/home.png";

type HomeBarProps = {
  onClick: () => void;
};

export default function HomeBar({ onClick }: HomeBarProps) {
  return (
    <div className="w-full bg-gray-800 p-4 flex items-center">
      <img 
        src={home} 
        alt="Home icon" 
        onClick={onClick} 
        className="h-8 w-8 cursor-pointer mr-4 invert"
      />
      <p 
        onClick={onClick} 
        className="text-white text-xl cursor-pointer font-bold"
      >
        Carbon Footprint Tracker
      </p>
    </div>
  );
}
