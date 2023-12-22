import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
  fetchLoads,
  createLoad,
  ListLoadsRequest,
  ListLoadsResponse,
  NewLoadForm,
  Load,
} from './load';
import LoadTableBody from "./LoadTableBody"

const LoadTable: React.FC = () => {
  const [loads, setLoads] = useState<Array<Load>>([]);
  const [newListLoadsRequest, setNewListLoadsRequest] = useState<ListLoadsRequest>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newLoadFormData, setNewLoadFormData] = useState<NewLoadForm>({
    name: '',
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
    powder: '',
    powderCharge: 0,
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
        setError(errorData.message || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred while processing your request to List Loads:' + error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLoadFormData({
      ...newLoadFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createLoad(newLoadFormData);
      closeModal();
      fetchData();
      setError(null);
    } catch (error) {
      setError('An error occurred while processing your request to create a Load:' + error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Add Load</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loads.length > 0 && <LoadTableBody loads={loads} />}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Add Load</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={newLoadFormData.name} onChange={handleInputChange} />
          </label>
          <label>
            Muzzle Velocity (fps):
            <input
              type="text"
              name="muzzleVelocity"
              value={newLoadFormData.muzzleVelocity}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Powder:
            <input type="text" name="powder" value={newLoadFormData.powder} onChange={handleInputChange} />
          </label>
          <label>
            Powder Charge (grams):
            <input type="text" name="powderCharge" value={newLoadFormData.powderCharge} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default LoadTable;
