import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  fetchScenarios,
  createScenario,
  updateScenario,
  ListScenariosRequest,
  ListScenariosResponse,
  CreateScenarioRequest,
  Scenario,
} from "./scenario";
import {
  fetchRifles,
  ListRiflesRequest,
  ListRiflesResponse,
  Rifle,
} from "./rifle";
import { fetchLoads, ListLoadsRequest, ListLoadsResponse, Load } from "./load";
import {
  fetchEnvironments,
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  Environment,
} from "./environment";
import ScenarioTableBody from "./ScenarioTableBody";

const ScenarioTable: React.FC = () => {
  const [scenarios, setScenarios] = useState<Array<Scenario>>([]);
  const [newListScenariosRequest, setNewListScenariosRequest] =
    useState<ListScenariosRequest>({});
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newCreateScenarioRequest, setNewCreateScenarioRequest] =
    useState<CreateScenarioRequest>({
      scenario: {
        name: "",
        environmentId: 0,
        rifleId: 0,
        loadId: 0,
      },
    });
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null,
  );

  // State for the list
  const [environments, setEnvironments] = useState<Array<Environment>>([]);
  const [rifles, setRifles] = useState<Array<Rifle>>([]);
  const [loads, setLoads] = useState<Array<Load>>([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch the list of scenarios
  const fetchData = async () => {
    try {
      const response = await fetchScenarios(newListScenariosRequest);

      if (response.ok) {
        const responseData: ListScenariosResponse = await response.json();
        setScenarios(responseData.scenarios);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      }
    } catch (error) {
      console.log(error);
      setError(
        "An error occurred while processing your request to List Scenarios:" +
          error,
      );
    }
  };

  // Fetch the list of loads on component mount
  useEffect(() => {
    // Fetch the list of loads and update the state
    const fetchLoadsList = async () => {
      try {
        const response = await fetchLoads({});
        if (response.ok) {
          const responseData: ListLoadsResponse = await response.json();
          setLoads(responseData.loads);
        } else {
          console.error("Error fetching loads:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching loads:", error);
      }
    };

    fetchLoadsList();
  }, []);

  // Fetch the list of rifles on component mount
  useEffect(() => {
    // Fetch the list of rifles and update the state
    const fetchRiflesList = async () => {
      try {
        const response = await fetchRifles({});
        if (response.ok) {
          const responseData: ListRiflesResponse = await response.json();
          setRifles(responseData.rifles);
        } else {
          console.error("Error fetching rifles:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching rifles:", error);
      }
    };

    fetchRiflesList();
  }, []);

  // Fetch the list of environments on component mount
  useEffect(() => {
    // Fetch the list of environments and update the state
    const fetchEnvironmentsList = async () => {
      try {
        const response = await fetchEnvironments({});
        if (response.ok) {
          const responseData: ListEnvironmentsResponse = await response.json();
          setEnvironments(responseData.environments);
        } else {
          console.error("Error fetching environments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching environments:", error);
      }
    };

    fetchEnvironmentsList();
  }, []);

  const openModal = () => {
    setSelectedScenario(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setNewCreateScenarioRequest((prev) => ({
      ...prev,
      scenario: {
        ...prev.scenario,
        [name]:
          name === "environmentId" || name === "rifleId" || name === "loadId"
            ? Number(value) || undefined
            : value,
      },
    }));
  };

  const handleUpdateClick = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setModalIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedScenario) {
        await updateScenario({
          scenario: {
            scenarioId: selectedScenario.scenarioId,
            name: newCreateScenarioRequest.scenario.name,
            environmentId: newCreateScenarioRequest.scenario.environmentId,
            loadId: newCreateScenarioRequest.scenario.loadId,
            rifleId: newCreateScenarioRequest.scenario.rifleId,
          },
        });
      } else {
        await createScenario(newCreateScenarioRequest);
      }
      closeModal();
      fetchData();
      setError(null);
    } catch (error) {
      setError(
        "An error occurred while processing your request to create a Scenario:" +
          error,
      );
    }
  };

  return (
    <div>
      <button onClick={openModal}>Add Scenario</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {scenarios.length > 0 && (
        <ScenarioTableBody
          scenarios={scenarios}
          updateHandle={handleUpdateClick}
        />
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>{selectedScenario ? "Update Scenario" : "Add Scenario"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newCreateScenarioRequest.scenario.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Environment:
            <select
              name="environmentId"
              value={newCreateScenarioRequest.scenario.environmentId || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select an environment
              </option>
              {environments.map((environment) => (
                <option
                  key={environment.environmentId}
                  value={environment.environmentId}
                >
                  {environment.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Rifle:
            <select
              name="rifleId"
              value={newCreateScenarioRequest.scenario.rifleId || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a rifle
              </option>
              {rifles.map((rifle) => (
                <option key={rifle.rifleId} value={rifle.rifleId}>
                  {rifle.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Load:
            <select
              name="loadId"
              value={newCreateScenarioRequest.scenario.loadId || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a load
              </option>
              {loads.map((load) => (
                <option key={load.loadId} value={load.loadId}>
                  {load.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
};

export default ScenarioTable;
