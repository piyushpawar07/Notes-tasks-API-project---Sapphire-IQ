import noteModel from "../models/note.model.js";

export const createNote = async (req, res) => {
        const { title, content, isPinned } = req.body;  
        
        const newNote = new noteModel({
        title,
        content,
        isPinned
        }); 

        const savedNote = await newNote.save();

        res.status(201).json({
            message: "Note created successfully",
            data: savedNote
        })
}


export const getAllNotes = async (req, res) => {
        const { title, content, isPinned } = req.query;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" || req.query.order === "asc" ? 1 : -1;
        const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
        const page = Math.max(Number(req.query.page) || 1, 1);
        const skipNumber = Number(req.query.skip);
        const skip = Number.isNaN(skipNumber)
            ? (page - 1) * limit
            : Math.max(skipNumber, 0);

        const allowedSortFields = ["title", "createdAt", "updatedAt", "isPinned"];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

        const filters = {};

        if (title) {
            filters.title = title;
        }

        if (content) {
            filters.content = content;
        }

        if (isPinned === "true" || isPinned === "false") {
            filters.isPinned = isPinned === "true";
        }

        const notes = await noteModel
            .find(filters)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        if(!notes || notes.length === 0) {
            return res.status(404).json({ message: "No notes found" });
        }

        res.status(200).json({
            message: "Notes retrieved successfully",
            data: notes,
            pagination: {
                skip,
                limit,
                page
            }
        })
}

export const getNoteById = async (req, res) => {
        const { id } = req.params;  

        const note = await noteModel.findById(id);

        if(!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note retrieved successfully",
            data: note
        })
}

export const updateNote = async (req, res) => {
        const { id } = req.params;  
        const { title, content, isPinned } = req.body; 

        const updatedNote = await noteModel.findByIdAndUpdate(
            id,
            { title, content, isPinned },
            { new: true, runValidators: true }
        );

        if(!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note updated successfully",
            data: updatedNote
        })
}

export const deleteNote = async (req, res) => {
        const { id } = req.params;  

        const deletedNote = await noteModel.findByIdAndDelete(id);

        if(!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }   

        res.status(200).json({
            message: "Note deleted successfully",
            data: deletedNote
        })
}

export const getPinnedNotes = async (req, res) => {
        const pinnedNotes = await noteModel.find({ isPinned: true });

        if(!pinnedNotes || pinnedNotes.length === 0) {
            return res.status(404).json({ message: "No pinned notes found" });
        }   

        res.status(200).json({
            message: "Pinned notes retrieved successfully",
            data: pinnedNotes
        })
}


