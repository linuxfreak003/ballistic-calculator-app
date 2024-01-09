import React, { useState, useEffect } from "react";
import { solveTable } from "./solve";
import {
  fetchScenarios,
  ListScenariosRequest,
  ListScenariosResponse,
  Scenario,
} from "./scenario";

const Solver: React.FC = () => {
  // State for form input values
  const [scenarioId, setScenarioId] = useState<number>(0);
  const [includeSpinDrift, setIncludeSpinDrift] = useState<boolean>(false);
  const [includeCoriolis, setIncludeCoriolis] = useState<boolean>(false);
  const [maxRange, setMaxRange] = useState<number>(0);
  const [increment, setIncrement] = useState<number>(0);

  // State for the list of scenarios
  const [scenarios, setScenarios] = useState<Array<Scenario>>([]);

  // State for the solved data
  const [solvedData, setSolvedData] = useState<any>(null);

  // Fetch the list of scenarios on component mount
  useEffect(() => {
    // Fetch the list of scenarios and update the state
    const fetchScenariosList = async () => {
      try {
        const response = await fetchScenarios({});
        if (response.ok) {
          const responseData: ListScenariosResponse = await response.json();
          setScenarios(responseData.scenarios);
        } else {
          console.error("Error fetching scenarios:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching scenarios:", error);
      }
    };

    fetchScenariosList();
  }, []);

  // Handle form submission
  const handleSolve = async () => {
    // Check if a scenario is selected before attempting to solve
    if (scenarioId !== null) {
      try {
        // Call the solving method with the form inputs
        const result = await solveTable({
          scenarioId,
          includeSpinDrift,
          includeCoriolis,
          maxRange,
          increment,
        });
        setSolvedData(result); // Update the state with the solved data
      } catch (error) {
        console.error("Error solving scenario:", error);
      }
    } else {
      console.warn("Please select a scenario before solving.");
    }
  };

  return (
    <div>
      <h2>Solver</h2>
      <form>
        <label>
          Scenario ID:
          <select
            value={scenarioId || ""}
            onChange={(e) => setScenarioId(Number(e.target.value))}
          >
            <option value="" disabled>
              Select a scenario
            </option>
            {scenarios.map((scenario) => (
              <option key={scenario.scenarioId} value={scenario.scenarioId}>
                {scenario.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Include Spin Drift:
          <input
            type="checkbox"
            checked={includeSpinDrift}
            onChange={() => setIncludeSpinDrift(!includeSpinDrift)}
          />
        </label>
        <label>
          Include Coriolis:
          <input
            type="checkbox"
            checked={includeCoriolis}
            onChange={() => setIncludeCoriolis(!includeCoriolis)}
          />
        </label>
        <label>
          Range:
          <input
            type="number"
            value={maxRange}
            onChange={(e) => setMaxRange(Number(e.target.value))}
          />
        </label>
        <label>
          Range:
          <input
            type="number"
            value={increment}
            onChange={(e) => setIncrement(Number(e.target.value))}
          />
        </label>
        <button type="button" onClick={handleSolve}>
          Solve
        </button>
      </form>
      {solvedData && (
        <div>
          <h3>Solved Data</h3>
          {/* Display the solved data in a table or as needed */}
          <pre>{JSON.stringify(solvedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Solver;
