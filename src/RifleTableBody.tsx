import React from "react";
import { Rifle } from "./rifle";

interface RifleTableBodyProps {
  rifles: Array<Rifle>;
}

const RifleTableBody: React.FC<RifleTableBodyProps> = ({ rifles }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Zero Range</th>
        </tr>
      </thead>
      <tbody>
        {rifles.map((item) => (
          <tr key={item.rifleId}>
            <td>{item.rifleId}</td>
            <td>{item.zeroRange}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RifleTableBody;
