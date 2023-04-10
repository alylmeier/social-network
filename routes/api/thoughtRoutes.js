const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThought).post(createThought);

// /api/students/:studentId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);



// /api/students/:studentId/assignments
router.route('/:thoughtId/reaction').post(addReaction);

// // /api/students/:studentId/assignments/:assignmentId
 router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);


module.exports = router;
