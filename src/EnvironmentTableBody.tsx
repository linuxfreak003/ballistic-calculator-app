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
          <th>Name</th>
          <th>Temperature (F)</th>
          <th>Altitude (ft)</th>
          <th>Pressure (hGa)</th>
          <th>Humidity (%)</th>
          <th>Wind Angle (deg)</th>
          <th>Wind Speed (mph)</th>
          <th>Absolute Pressure</th>
          <th>Latidude (deg)</th>
          <th>Azimuth</th>
        </tr>
      </thead>
      <tbody>
        {environments.map((item) => (
          <tr key={item.environmentId}>
            <td>{item.environmentId}</td>
            <td>{item.name}</td>
            <td>{item.temperature}</td>
            <td>{item.altitude}</td>
            <td>{item.pressure}</td>
            <td>{item.humidity}</td>
            <td>{item.windAngle}</td>
            <td>{item.windSpeed}</td>
            <td>{item.pressureIsAbsolute}</td>
            <td>{item.latitude}</td>
            <td>{item.azimuth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EnvironmentTableBody;
