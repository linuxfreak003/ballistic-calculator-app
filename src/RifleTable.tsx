import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  fetchRifles,
  createRifle,
  ListRiflesRequest,
  ListRiflesResponse,
  CreateRifleRequest,
  Rifle,
} from "./rifle";
import RifleTableBody from "./RifleTableBody";

const RifleTable: React.FC = () => {
  const [rifles, setRifles] = useState<Array<Rifle>>([]);
  const [newListRiflesRequest, setNewListRiflesRequest] =
    useState<ListRiflesRequest>({});
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newCreateRifleRequest, setNewCreateRifleRequest] =
    useState<CreateRifleRequest>({
      rifle: {
        name: "",
        sightHeight: 1.5,
        barrelTwist: 7.0,
        twistDirectionLeft: false,
        zeroRange: 100,
      },
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchRifles(newListRiflesRequest);

      if (response.ok) {
        const responseData: ListRiflesResponse = await response.json();
        setRifles(responseData.rifles);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      }
    } catch (error) {
      setError(
        "An error occurred while processing your request to List Rifles:" +
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
    setNewCreateRifleRequest({
      ...newCreateRifleRequest,
      rifle: {
        ...newCreateRifleRequest.rifle,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createRifle(newCreateRifleRequest);
      closeModal();
      fetchData();
      setError(null);
    } catch (error) {
      setError(
        "An error occurred while processing your request to create a Rifle:" +
          error,
      );
    }
  };

  return (
    <div>
      <button onClick={openModal}>Add Rifle</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {rifles.length > 0 && <RifleTableBody rifles={rifles} />}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Add Rifle</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newCreateRifleRequest.rifle.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Sight Height (in):
            <input
              type="text"
              name="sightHeight"
              value={newCreateRifleRequest.rifle.sightHeight}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Barrel Twist (in):
            <input
              type="text"
              name="barrelTwist"
              value={newCreateRifleRequest.rifle.barrelTwist}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Zero Range (yrds):
            <input
              type="text"
              name="zeroRange"
              value={newCreateRifleRequest.rifle.zeroRange}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default RifleTable;
