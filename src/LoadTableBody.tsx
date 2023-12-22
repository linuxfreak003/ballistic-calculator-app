import React from 'react';
import { Load } from './load';

interface LoadTableBodyProps {
  loads: Array<Load>;
}

const LoadTableBody: React.FC<LoadTableBodyProps> = ({ loads }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>MuzzleVelocity</th>
          <th>Powder</th>
          <th>Powder Charge</th>
        </tr>
      </thead>
      <tbody>
        {loads.map((item) => (
          <tr key={item.loadId}>
            <td>{item.loadId}</td>
            <td>{item.muzzleVelocity}</td>
            <td>{item.powder}</td>
            <td>{item.powderCharge}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoadTableBody;
