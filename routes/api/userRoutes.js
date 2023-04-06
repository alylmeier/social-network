const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUser).post(createUser);

// /api/users/:courseId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
// /api/users/:userId/friends/:friendId


// POST to add a new friend to a user's friend list


// DELETE to remove a friend from a user's friend list