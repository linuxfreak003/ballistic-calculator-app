import React, { useState, useEffect } from "react";
import { solveTable, SolveTableResponse, Solution } from "./solve";
import {
  fetchScenarios,
  ListScenariosRequest,
  ListScenariosResponse,
  Scenario,
} from "./scenario";
import SolutionTableBody from "./SolutionTableBody";

const Solver: React.FC = () => {
  // State for form input values
  const [scenarioId, setScenarioId] = useState<number>(0);
  const [includeSpinDrift, setIncludeSpinDrift] = useState<boolean>(false);
  const [includeCoriolis, setIncludeCoriolis] = useState<boolean>(false);
  const [maxRange, setMaxRange] = useState<number>(0);
  const [increment, setIncrement] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // State for the list of scenarios
  const [scenarios, setScenarios] = useState<Array<Scenario>>([]);

  // State for the solved data
  const [solutions, setSolutions] = useState<Array<Solution>>([]);

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
    console.log("handleSolve called");
    console.log(scenarioId);
    if (scenarioId !== null) {
      try {
        // Call the solving method with the form inputs
        const response = await solveTable({
          scenarioId,
          includeSpinDrift,
          includeCoriolis,
          maxRange,
          increment,
        });
        if (response.ok) {
          const responseData: SolveTableResponse = await response.json();
          setSolutions(responseData.solutions); // Update the state with the solved data
          setError(null);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "An error occurred");
        }
      } catch (error) {
        setError(
          "An error occurred while processing your request to List Environments:" +
            error,
        );
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
          Max Range:
          <input
            type="number"
            value={maxRange}
            onChange={(e) => setMaxRange(Number(e.target.value))}
          />
        </label>
        <label>
          Increment:
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

      {error && <p style={{ color: "red" }}>{error}</p>}
      {solutions.length > 0 && (
        <div>
          <h3>Solution</h3>
          <SolutionTableBody solutions={solutions} />
        </div>
      )}
    </div>
  );
};

export default Solver;
