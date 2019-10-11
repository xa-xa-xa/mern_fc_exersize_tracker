const router = require('express').Router()
const Exercise = require('../models/exercise.model')

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*
 * Adding and saving NEW exercise
 */


router.route('/add').post((req, res) => {
    const {
        username,
        description
    } = req.body;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*
 * Find and Delete Exercises
 */

/*
 * Find
 */
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error (.findById)' + err));
});

/*  
 * Delete
 */
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error (.delete): ' + err));
});

/*
 * Update
 */
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json(`Exercise ${req.params.id} updated`))
                .catch(err => res.status(400).json('Error (.save): ' + err));
        })
        .catch(err => res.status(400).json('Error (update): ' + err))
});



module.exports = router