const express = require('express');
const router = express.Router();


let notes = [];

// GET
router.get('/', (req, res) => {
    res.json(notes);
});

// Get by ID
router.get('/:id', (req, res) => {
    const found = notes.find(n => n.id == req.params.id);

    if (!found) {
        return res.status(404).json({ msg: 'Note not found' });
    }

    res.json(found);
});

// Create new note
router.post('/', (req, res) => {
    const newNote = {
        id: Date.now(),
        title: req.body.title,
        text: req.body.text
    };

    notes.push(newNote);
    res.json(newNote);
});

// Update note
router.put('/:id', (req, res) => {
    const found = notes.find(n => n.id == req.params.id);

    if (found) {
        found.title = req.body.title || found.title;
        found.text = req.body.text || found.text;
        res.json(found);
    } else {
        res.status(404).json({ msg: 'Not found' });
    }
});

// Delete note
router.delete('/:id', (req, res) => {
    const exists = notes.some(n => n.id == req.params.id);

    if (exists) {
        notes = notes.filter(n => n.id != req.params.id);
        res.json({ msg: 'Deleted' });
    } else {
        res.status(404).json({ msg: 'Not found' });
    }
});

module.exports = router;