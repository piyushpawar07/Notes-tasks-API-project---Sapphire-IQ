import noteModel from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
        const { title, content, isPinned } = req.body;  

        if(!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
        }

        if(typeof isPinned !== 'boolean') {
        return res.status(400).json({ message: "isPinned must be a boolean" });
        }
        
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

    } catch (error) {   
        res.status(500).json({ message: "Error creating note",error: error.message });
    }
}


export const getAllNotes = async (req, res) => {
    try {
        const notes = await noteModel.find();   

        if(!notes || notes.length === 0) {
            return res.status(404).json({ message: "No notes found" });
        }

        res.status(200).json({
            message: "Notes retrieved successfully",
            data: notes
        })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving notes", error: error.message });
    }
}

export const getNoteById = async (req, res) => {
    try {
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
    catch(error) {
        res.status(500).json({ message: "Error retrieving note", error: error.message });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;  
        const { title, content, isPinned } = req.body; 
        
        if(!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const updatedNote = await noteModel.findByIdAndUpdate(id, { title, content, isPinned }, { new: true });

        if(!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note updated successfully",
            data: updatedNote
        })
    }
    catch(error) {
        res.status(500).json({ message: "Error updating note", error: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
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
    catch(error) {
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }
}

export const getPinnedNotes = async (req, res) => {
    try {   

        const pinnedNotes = await noteModel.find({ isPinned: true });

        if(!pinnedNotes || pinnedNotes.length === 0) {
            return res.status(404).json({ message: "No pinned notes found" });
        }   

        res.status(200).json({
            message: "Pinned notes retrieved successfully",
            data: pinnedNotes
        })
    }
    catch(error) {
        res.status(500).json({ message: "Error retrieving pinned notes", error: error.message });
    } 
}


