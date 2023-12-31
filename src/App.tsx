import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TopBar from './TopBar';
import ScenarioTable from './ScenarioTable';
import LoadTable from './LoadTable';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ScenarioTable');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Ballistic Calculator</h1>
      <TopBar activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'ScenarioTable' && <ScenarioTable />}
      {activeTab === 'LoadTable' && <LoadTable />}
    </div>
  );
};

export default App;
