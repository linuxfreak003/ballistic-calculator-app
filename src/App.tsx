import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import TopBar from "./TopBar";
import ScenarioTable from "./ScenarioTable";
import EnvironmentTable from "./EnvironmentTable";
import RifleTable from "./RifleTable";
import LoadTable from "./LoadTable";
import Solver from "./Solver";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ScenarioTable");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Ballistic Calculator</h1>
      <TopBar activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === "Scenarios" && <ScenarioTable />}
      {activeTab === "Environments" && <EnvironmentTable />}
      {activeTab === "Rifles" && <RifleTable />}
      {activeTab === "Loads" && <LoadTable />}
      {activeTab === "Solver" && <Solver />}
    </div>
  );
};

export default App;
