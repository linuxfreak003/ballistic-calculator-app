import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  fetchEnvironments,
  createEnvironment,
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  CreateEnvironmentRequest,
  Environment,
} from "./environment";
import EnvironmentTableBody from "./EnvironmentTableBody";

const EnvironmentTable: React.FC = () => {
  const [environments, setEnvironments] = useState<Array<Environment>>([]);
  const [newListEnvironmentsRequest, setNewListEnvironmentsRequest] =
    useState<ListEnvironmentsRequest>({});
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newCreateEnvironmentRequest, setNewCreateEnvironmentRequest] =
    useState<CreateEnvironmentRequest>({
      environment: {
        name: "",
        temperature: 70,
        altitude: 0,
        pressure: 27.75,
        humidity: 10,
        windAngle: 0,
        windSpeed: 0,
        pressureIsAbsolute: false,
        latitude: 0,
        azimuth: 0,
      },
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchEnvironments(newListEnvironmentsRequest);

      if (response.ok) {
        const responseData: ListEnvironmentsResponse = await response.json();
        setEnvironments(responseData.environments);
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
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCreateEnvironmentRequest({
      ...newCreateEnvironmentRequest,
      environment: {
        ...newCreateEnvironmentRequest.environment,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createEnvironment(newCreateEnvironmentRequest);
      closeModal();
      fetchData();
      setError(null);
    } catch (error) {
      setError(
        "An error occurred while processing your request to create a Environment:" +
          error,
      );
    }
  };

  return (
    <div>
      <button onClick={openModal}>Add Environment</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {environments.length > 0 && (
        <EnvironmentTableBody environments={environments} />
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Add Environment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newCreateEnvironmentRequest.environment.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Temperature (Fahrenheit):
            <input
              type="text"
              name="temperature"
              value={newCreateEnvironmentRequest.environment.temperature}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default EnvironmentTable;
