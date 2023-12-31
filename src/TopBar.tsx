import React from 'react';

interface TopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['ScenarioTable', 'LoadTable'];

  return (
    <div className="top-bar">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TopBar;
