import React from "react";
import { Load } from "./load";

interface LoadTableBodyProps {
  loads: Array<Load>;
}

const LoadTableBody: React.FC<LoadTableBodyProps> = ({ loads }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Bullet Caliber (in)</th>
          <th>Bullet Weight (g)</th>
          <th>Bullet Length (in)</th>
          <th>Ballistic Coefficient</th>
          <th>Drag Function</th>
          <th>MuzzleVelocity (fps)</th>
          <th>Powder</th>
          <th>Powder Charge</th>
        </tr>
      </thead>
      <tbody>
        {loads.map((item) => (
          <tr key={item.loadId}>
            <td>{item.loadId}</td>
            <td>{item.name}</td>
            <td>{item.bullet.caliber}</td>
            <td>{item.bullet.weight}</td>
            <td>{item.bullet.length}</td>
            <td>{item.bullet.bc.value}</td>
            <td>{item.bullet.bc.dragFunction}</td>
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
