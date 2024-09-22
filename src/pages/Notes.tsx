import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import NoteCard from '../components/NoteCard';
import StatusAlert from '../components/StatusAlert';
import { fetchPlayers } from '../services/PlayerService';
import { getValidVariant } from '../common/utils';

// import { Player } from '../common/types/Note';

const Notes: React.FC = () => {
  // const [notes, setNotes] = useState<Player[]>([]);
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [noteToDelete, setNoteToDelete] = useState<Player | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const alertOpts = useRef({ isShow: false, variant: getValidVariant("success"), message: '' });

  const getNotes = async () => {
    try {
      const data = await fetchPlayers();
      // setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     getNotes();
  //   }, 300); // Debounce for better performance

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchTerm]);

  const handleAddNote = () => navigate('/console/note-editor', { state: { isNew: true } });

  const handleDeleteNote = async () => {
    // if (!noteToDelete) return;

    setIsLoading(true);
    // try {
    //   await deleteNote(noteToDelete.id);
    //   setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteToDelete.id));
    //   setAlert('Note deleted successfully', 'success');
    // } catch (error) {
    //   console.error('Error deleting note:', error);
    //   setAlert('Something went wrong', 'failure');
    // } finally {
    //   setNoteToDelete(null);
    //   setShowModal(false);
    //   setIsLoading(false);
    // }
  };

  // const handleOpenModal = (note: Player) => {
  //   setNoteToDelete(note);
  //   setShowModal(true);
  // };

  // const handleEditNote = (note: Player) => navigate(`/console/note-editor/${note.id}`);

  const handleDismissAlert = () => {
    alertOpts.current.isShow = false;
  };

  const setAlert = (message: string, variant: string) => {
    alertOpts.current = { isShow: true, variant: getValidVariant(variant), message };
  };

  return (
    <div>
      <Helmet>
        <title>Notes</title>
      </Helmet>

      <div className="container-fluid mt-3">
        <div className="row mb-3">
          <div className="col-12">
            <Button variant="success" onClick={handleAddNote}>
              <i className="fas fa-plus"></i> Add Note
            </Button>
          </div>
          <div className="col-12 mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search notes..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* <div className="row">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div className="col-md-3 mb-3" key={note.id}>
                <NoteCard
                  title={note.name}
                  content={note.content}
                  onEdit={() => handleEditNote(note)}
                  onDelete={() => handleOpenModal(note)}
                />
              </div>
            ))
          ) : (
            <div className="col-12">No notes available</div>
          )}
        </div> */}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this note?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteNote} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="px-2">Deleting...</span>
              </>
            ) : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

      <StatusAlert
        show={alertOpts.current.isShow}
        variant={alertOpts.current.variant}
        message={alertOpts.current.message}
        onDismiss={handleDismissAlert}
      />
    </div>
  );
};

export default Notes;
