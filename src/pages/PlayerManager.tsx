import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormLabel';
import './player-manager.css';
import { addPlayer, fetchPlayers, updatePlayer, deletePlayer } from '../services/PlayerService';
import useForm from '../hooks/useForm';
import { Player } from '../common/types/Player';

interface PlayerFormData {
  name: string;
  skill_level: number;
}

const PlayerManager: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<number | null>(null);

  // Fetch players on component mount
  useEffect(() => {
    const getPlayers = async () => {
      try {
        const data = await fetchPlayers();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    getPlayers();
  }, []);

  const handleShowModal = (player?: Player) => {
    setCurrentPlayer(player || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPlayer(null);
  };

  const handleAddPlayer = async (e: React.FormEvent<HTMLFormElement>, newPlayerData: PlayerFormData) => {
    e.preventDefault();
    const newPlayer = await addPlayer(newPlayerData.name, newPlayerData?.skill_level ?? 1);
    setPlayers([...players, newPlayer]);
    handleCloseModal();
  };

  const handleUpdatePlayer = async (e: React.FormEvent<HTMLFormElement>, updatedPlayerData: PlayerFormData) => {
    e.preventDefault();
    if (currentPlayer) {
      const updatedPlayer = await updatePlayer(currentPlayer.id, updatedPlayerData.name, updatedPlayerData.skill_level);
      if (updatedPlayer) {
        setPlayers(players.map(player => (player.id === currentPlayer.id ? updatedPlayer : player)));
      }
    }
    handleCloseModal();
  };

  const handleShowConfirmModal = (id: number) => {
    setPlayerToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setPlayerToDelete(null);
  };

  const handleDeletePlayer = async () => {
    if (playerToDelete) {
      await deletePlayer(playerToDelete);
      setPlayers(players.filter(player => player.id !== playerToDelete));
      handleCloseConfirmModal();
    }
  };

  // Form validation rules
  const validators = {
    name: {
      required: { value: true, message: 'Name is required' },
      minLength: { value: 3, message: 'Name must be at least 3 characters long' },
    },
  };

  const { handleChange, handleSubmit, errors } = useForm<PlayerFormData>({
    onSubmit: currentPlayer ? handleUpdatePlayer : handleAddPlayer,
    validators,
  });

  return (
    <div className="player-manager">
      <div className="table-section">
        <div className="heading-container">
          <h2>Player Management</h2>
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add Player
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Skill Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">No data available</td>
              </tr>
            ) : (
              players.map((player) => (
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.skill_level}</td>
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => handleShowModal(player)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleShowConfirmModal(player.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPlayer ? 'Edit Player' : 'Add Player'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="playerName">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter player name"
                isInvalid={!!errors?.name}
                onChange={handleChange('name')}
                defaultValue={currentPlayer?.name || ''}
              />
              <Form.Control.Feedback type="invalid">{errors?.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="playerSkill">
              <FormLabel>Skill Level</FormLabel>
              <FormControl
                as="select"
                onChange={handleChange('skill_level')}
                defaultValue={currentPlayer?.skill_level || 1}
              >
                {[1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </FormControl>
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentPlayer ? 'Update Player' : 'Add Player'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this player?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeletePlayer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlayerManager;
