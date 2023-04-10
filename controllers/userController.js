const { User } = require('../models');

module.exports = {
  // Get all users
  getUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

addFriend: async (req, res) => {
    try {
        const friend = await User.findByIdAndUpdate(
                    { _id: req.params.userId},
                    { $push: { friends: req.body} },
                    { new: true}
            )
        !friend  ? res.status(404).json({ message: 'no friend with this ID' }) : res.json(friend)
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err); 
    }

  },

  removeFriend: async (req, res) => {
    try {
        const friend = await User.findByIdAndUpdate(
                    { userId: req.params.userId},
                    { $pull: { friends: params.friendId} },
                    { new: true}
            )
        !friend  ? res.status(404).json({ message: 'no friend with this ID' }) : res.json(friend)
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err); 
    }

  },

};
