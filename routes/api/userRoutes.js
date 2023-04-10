const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
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


router.route('/:userId/friend').post(addFriend);

// // /api/students/:studentId/assignments/:assignmentId
 router.route('/:userId/friend/:friendId').delete(removeFriend);

