import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  fetchLoads,
  createLoad,
  ListLoadsRequest,
  ListLoadsResponse,
  CreateLoadRequest,
  Load,
} from "./load";
import LoadTableBody from "./LoadTableBody";

const LoadTable: React.FC = () => {
  const [loads, setLoads] = useState<Array<Load>>([]);
  const [newListLoadsRequest, setNewListLoadsRequest] =
    useState<ListLoadsRequest>({});
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newCreateLoadRequest, setNewCreateLoadRequest] =
    useState<CreateLoadRequest>({
      load: {
        name: "",
        muzzleVelocity: 0,
        bullet: {
          caliber: 0,
          weight: 0,
          bc: {
            value: 0,
            dragFunction: 0,
          },
          length: 0,
        },
        powder: "",
        powderCharge: 0,
      },
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchLoads(newListLoadsRequest);

      if (response.ok) {
        const responseData: ListLoadsResponse = await response.json();
        setLoads(responseData.loads);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      }
    } catch (error) {
      setError(
        "An error occurred while processing your request to List Loads:" +
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
    setNewCreateLoadRequest({
      ...newCreateLoadRequest,
      load: {
        ...newCreateLoadRequest.load,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createLoad(newCreateLoadRequest);
      closeModal();
      fetchData();
      setError(null);
    } catch (error) {
      setError(
        "An error occurred while processing your request to create a Load:" +
          error,
      );
    }
  };

  return (
    <div>
      <button onClick={openModal}>Add Load</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loads.length > 0 && <LoadTableBody loads={loads} />}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Add Load</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newCreateLoadRequest.load.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Muzzle Velocity (fps):
            <input
              type="text"
              name="muzzleVelocity"
              value={newCreateLoadRequest.load.muzzleVelocity}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Caliber (in):
            <input
              type="text"
              name="caliber"
              value={newCreateLoadRequest.load.bullet.caliber}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Bullet Weight (g):
            <input
              type="text"
              name="weight"
              value={newCreateLoadRequest.load.bullet.weight}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Bullet Length (in):
            <input
              type="text"
              name="length"
              value={newCreateLoadRequest.load.bullet.length}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Ballistic Coefficient:
            <input
              type="text"
              name="value"
              value={newCreateLoadRequest.load.bullet.bc.value}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Drag Function:
            <input
              type="text"
              name="dragFunction"
              value={newCreateLoadRequest.load.bullet.bc.dragFunction}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Powder:
            <input
              type="text"
              name="powder"
              value={newCreateLoadRequest.load.powder}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Powder Charge (grams):
            <input
              type="text"
              name="powderCharge"
              value={newCreateLoadRequest.load.powderCharge}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default LoadTable;
