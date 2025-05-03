import { useState } from "react";
import HomePage from "./HomePage";
import { TileContext } from "./context/TileContext";
import HomeBar from "./HomeBar";
import ActivityPage from "./ActivityPage";
import Dashboard from "./Dashboard";
import TipsPage from "./TipsPage";
import Achievements from "./Achievements";

function App() {
  const [view, setView] = useState("home");

  return (
    <>
      {view === "home" && (
        <TileContext.Provider
          value={(page: string) => {
            setView(page);
            window.scrollTo(0, 0);
          }}
        >
          <HomePage></HomePage>
        </TileContext.Provider>
      )}
      {view !== "home" && <HomeBar onClick={() => setView("home")}></HomeBar>}
      {view === "Log Activity" && <ActivityPage></ActivityPage>}
      {view === "Dashboard" && <Dashboard></Dashboard>}
      {view === "Tips + Resources" && <TipsPage></TipsPage>}
      {view === "Achievements" && <Achievements></Achievements>}
    </>
  );
}

export default App;
