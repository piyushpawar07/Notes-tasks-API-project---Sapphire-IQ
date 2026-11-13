import { Router } from 'express';
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote, getPinnedNotes } from '../controllers/note.controller.js';

const noteRouter = Router();

noteRouter.post('/notes', createNote);
noteRouter.get('/notes', getAllNotes);
noteRouter.get('/notes/:id', getNoteById);
noteRouter.put('/notes/:id', updateNote);
noteRouter.delete('/notes/:id', deleteNote);
noteRouter.get('/notes/pinned', getPinnedNotes);

export default noteRouter;