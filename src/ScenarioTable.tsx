import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
  fetchScenarios,
  createScenario,
  updateScenario,
  ListScenariosRequest,
  ListScenariosResponse,
  CreateScenarioRequest,
  Scenario,
} from './scenario';
import ScenarioTableBody from "./ScenarioTableBody"

const ScenarioTable: React.FC = () => {
  const [scenarios, setScenarios] = useState<Array<Scenario>>([]);
  const [newListScenariosRequest, setNewListScenariosRequest] = useState<ListScenariosRequest>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newCreateScenarioRequest, setNewCreateScenarioRequest] = useState<CreateScenarioRequest>({
    scenario: {
      name: '',
      environmentId: 0,
      rifleId: 0,
      loadId: 0,
    },
  });
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchScenarios(newListScenariosRequest);

      if (response.ok) {
        const responseData: ListScenariosResponse = await response.json();
        setScenarios(responseData.scenarios);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred while processing your request to List Scenarios:' + error);
    }
  };

  const openModal = () => {
    setSelectedScenario(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCreateScenarioRequest({
      ...newCreateScenarioRequest,
      scenario: {
        ...newCreateScenarioRequest.scenario,
        [e.target.name]: e.target.value,
      },
    });
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
      setError('An error occurred while processing your request to create a Scenario:' + error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Add Scenario</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {scenarios.length > 0 && <ScenarioTableBody scenarios={scenarios} updateHandle={handleUpdateClick} />}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>{selectedScenario ? 'Update Scenario' : 'Add Scenario'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={newCreateScenarioRequest.scenario.name} onChange={handleInputChange} />
          </label>
          <label>
            EnvironmentId:
            <input
              type="text"
              name="environmentId"
              value={newCreateScenarioRequest.scenario.environmentId}
              onChange={handleInputChange}
            />
          </label>
          <label>
            RifleId:
            <input type="text" name="rifleId" value={newCreateScenarioRequest.scenario.rifleId} onChange={handleInputChange} />
          </label>
          <label>
            LoadId:
            <input type="text" name="loadId" value={newCreateScenarioRequest.scenario.loadId} onChange={handleInputChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
};

export default ScenarioTable;
