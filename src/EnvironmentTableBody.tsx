import React from "react";
import { Environment } from "./environment";

interface EnvironmentTableBodyProps {
  environments: Array<Environment>;
}

const EnvironmentTableBody: React.FC<EnvironmentTableBodyProps> = ({
  environments,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Temperature</th>
        </tr>
      </thead>
      <tbody>
        {environments.map((item) => (
          <tr key={item.environmentId}>
            <td>{item.environmentId}</td>
            <td>{item.temperature}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EnvironmentTableBody;
