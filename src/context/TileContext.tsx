import { createContext } from "react";

export const TileContext = createContext<(value: string) => void | undefined>(() => undefined);