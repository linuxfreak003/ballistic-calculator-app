import React from 'react';
import { Scenario } from './scenario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface ScenarioTableBodyProps {
  scenarios: Array<Scenario>;
  updateHandle: any;
}

const ScenarioTableBody: React.FC<ScenarioTableBodyProps> = ({ scenarios, updateHandle }) => {
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
            <td>
              <button onClick={() => updateHandle(item)}><FontAwesomeIcon icon={faEdit} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScenarioTableBody;
