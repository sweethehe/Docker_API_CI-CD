const express = require('express');
const router = express.Router();

// F A K E - T A S K S
let tasks = [
    { id: 1, title: "Apprendre Docker", completed: false },
    { id: 2, title: "Faire le TP CI/CD", completed: false }
];

// R E A D - T A S K S
router.get('/', (req, res) => {
    res.json(tasks);
});

// C R E A T E - A - T A S K
router.post('/', (req, res) => {
    const title = req.body.title;
    
    if (!title) {
        return res.status(400).json({ error: "Le titre de la tâche est obligatoire" });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// U P D A T E - A - T A S K
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
});

// D E L E T E - A - T A S K
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: "Tâche supprimée avec succès" });
});

module.exports = router;

