import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormLabel';
import useForm from '../hooks/useForm'; // Ensure this hook provides required return values
import { addTeam, fetchTeams, updateTeam, deleteTeam } from '../services/TeamService';
import { Team } from '../common/types/Team';
import './teams.css';

interface TeamFormData {
  name: string;
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<number | null>(null);

  // Fetch teams on component mount
  useEffect(() => {
    const getTeams = async () => {
      try {
        const data = await fetchTeams();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    getTeams();
  }, []);

  const handleShowModal = (team?: Team) => {
    setCurrentTeam(team || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTeam(null);
  };

  const handleShowConfirmModal = (id: number) => {
    setTeamToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setTeamToDelete(null);
  };

  const handleAddOrUpdateTeam = async (e: React.FormEvent<HTMLFormElement>, newTeamData: TeamFormData) => {
    debugger
    e.preventDefault();

    if (currentTeam) {
      const updatedTeam = await updateTeam(currentTeam.id, newTeamData.name);
      setTeams(teams.map(team => (team.id === currentTeam.id ? updatedTeam : team)));
    } else {
      const newTeam = await addTeam(newTeamData.name);
      setTeams([...teams, newTeam]);
    }

    handleCloseModal();
  };

  const handleDeleteTeam = async () => {
    debugger
    if (teamToDelete !== null) {
      await deleteTeam(teamToDelete);
      setTeams(teams.filter(team => team.id !== teamToDelete));
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

  const { handleChange, handleSubmit, errors } = useForm<TeamFormData>({
    onSubmit: handleAddOrUpdateTeam,
    validators,
  });

  return (
    <div className="team-manager">
      <div className="table-section">
        <div className="heading-container">
          <h2>Team Management</h2>
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add Team
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">No data available</td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => handleShowModal(team)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleShowConfirmModal(team.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentTeam ? 'Edit Team' : 'Add Team'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="teamName">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter team name"
                isInvalid={!!errors?.name}
                onChange={handleChange('name')}
                defaultValue={currentTeam?.name || ''}
              />
              <Form.Control.Feedback type="invalid">{errors?.name}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentTeam ? 'Update Team' : 'Add Team'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this team?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTeam}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default Teams;
