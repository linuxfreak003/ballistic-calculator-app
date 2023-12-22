import React from 'react';

interface TabsProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['Scenarios', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${activeTab === index ? 'active' : ''}`}
          onClick={() => onTabChange(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
