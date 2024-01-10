import React from "react";
import { Solution } from "./solve";

interface SolutionTableBodyProps {
  solutions: Array<Solution>;
}

const SolutionTableBody: React.FC<SolutionTableBodyProps> = ({ solutions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Range (yrds)</th>
          <th>Drop (in)</th>
          <th>Time (s)</th>
          <th>Windage (in)</th>
          <th>Energy (ft/lbs)</th>
          <th>Velocity (fps)</th>
        </tr>
      </thead>
      <tbody>
        {solutions.map((item) => (
          <tr key={item.range}>
            <td>{item.range}</td>
            <td>{Number(item.drop).toFixed(2)}</td>
            <td>{Number(item.time).toFixed(2)}</td>
            <td>{Number(item.windage).toFixed(2)}</td>
            <td>{Number(item.energy).toFixed(2)}</td>
            <td>{Number(item.velocity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SolutionTableBody;
