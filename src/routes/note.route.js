import { Router } from 'express';
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote, getPinnedNotes } from '../controllers/note.controller.js';
import { validateRequest } from '../middleware/error.middleware.js';
import { noteBodyValidation, noteIdValidation } from '../middleware/validation.middleware.js';

const noteRouter = Router();

noteRouter.post('/notes', noteBodyValidation, validateRequest, createNote);
noteRouter.get('/notes', getAllNotes);
noteRouter.get('/notes/pinned', getPinnedNotes);
noteRouter.get('/notes/:id', noteIdValidation, validateRequest, getNoteById);
noteRouter.put('/notes/:id', noteIdValidation, noteBodyValidation, validateRequest, updateNote);
noteRouter.delete('/notes/:id', noteIdValidation, validateRequest, deleteNote);

export default noteRouter;