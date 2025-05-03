import { useContext } from "react";
import { TileContext } from "./context/TileContext";

type TileProps = {
  title: string;
};

export default function Tile({ title }: TileProps) {
  const onClick = useContext(TileContext);

  return (
    <div
      onClick={() => onClick(title)}
      className="w-52 h-32 bg-gray-800 text-white rounded-lg shadow-md active:bg-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out flex items-center justify-center cursor-pointer select-none"
    >
      <span className="text-2xl font-bold leading-none text-center">
        {title}
      </span>
    </div>
  );
}
