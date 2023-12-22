import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Tabs from './Tabs';

const App: React.FC = () => {
  return (
    <div>
      <h1>Ballistic Calculator</h1>
      <ScenarioTable />
    </div>
  );
};

export default App;
