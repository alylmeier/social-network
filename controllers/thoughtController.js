const { Thought, User } = require('../models');

module.exports = {
  // Get all users
   getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
//   createThought(req, res) {
//     Thought.create(req.body)
//       .then((thought) => {
//         return User.findOneAndUpdate(
//                 { username: thought.username},
//                 { $push: { thoughts: thought._id} },
//                 { new: true}
//         )
        
//       }).then(user =>  
//         !user  ? res.status(404).json({ message: 'thought created, but no user with this ID' }) : res.json({ message: 'thought created' })
//              ) 
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
 createThought: async (req, res) => {
    try {
        const thought = await Thought.create(req.body)
        const user = await User.findOneAndUpdate(
                    { username: thought.username},
                    { $push: { thoughts: thought._id} },
                    { new: true}
            )
        !user  ? res.status(404).json({ message: 'thought created, but no user with this ID' }) : res.json({ message: 'thought created' })
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err); 
    }

  },
//   createComment(req, res) {
//     Comment.create(req.body)
//       .then((comment) => {
//         return Post.findOneAndUpdate(
//           { _id: req.body.postId },
//           { $push: { comments: comment._id } },
//           { new: true }
//         );
//       })
//       .then((post) =>
//         !post
//           ? res
//               .status(404)
//               .json({ message: 'comment created, but no posts with this ID' })
//           : res.json({ message: 'comment created' })
//       )
//       .catch((err) => {
//         console.error(err);
//       });
//   },
  // Delete a course
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction: async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId},
                    { $push: { reactions: req.body} },
                    { new: true}
            )
        !thought  ? res.status(404).json({ message: 'no thought with this ID' }) : res.json(thought)
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err); 
    }

  },

  removeReaction: async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId},
                    { $pull: { reactions: { _id: req.params.reactionId}} },
                    { new: true}
            )
        !thought  ? res.status(404).json({ message: 'no thought with this ID' }) : res.json(thought)
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err); 
    }

  },
};

