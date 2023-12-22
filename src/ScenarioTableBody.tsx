import React from 'react';
import { Scenario } from './api';

interface ScenarioTableBodyProps {
  scenarios: Array<Scenario>;
}

const ScenarioTableBody: React.FC<ScenarioTableBodyProps> = ({ scenarios }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>EnvironmentId</th>
          <th>RifleId</th>
          <th>LoadId</th>
        </tr>
      </thead>
      <tbody>
        {scenarios.map((item) => (
          <tr key={item.scenarioId}>
            <td>{item.scenarioId}</td>
            <td>{item.name}</td>
            <td>{item.environmentId}</td>
            <td>{item.rifleId}</td>
            <td>{item.loadId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScenarioTableBody;
