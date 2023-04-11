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


 updateThought: async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $set: req.body }, { runValidators: true, new: true });
        !dbThoughtData  ? res.status(404).json({ message: 'could not update thought' }) : res.json({ message: 'thought updated' })
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err); 
    }

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


  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No video with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

//   removeReaction: async (req, res) => {
//     const thought = await Thought.findByIdAndUpdate(
//         { _id: req.params.thoughtId },
//         {},
//         { new: true }
//       );
//       console.log('friend before pull:', thought);
      
//       const updatedThought = await Thought.findByIdAndUpdate(
//         { _id: req.params.thoughtId },
//         { $pull: { reactions: req.params. reactionid } },
//         { new: true }
//       );
      
      
//       !updatedThought
//         ? res.status(404).json({ message: 'no thought with this ID' })
//         : res.json(updatedThought);
      
//   }
//     try {
//         const thought = await Thought.findbyIdAndUpdate(
//                     { _id: req.params.thoughtId},
//                     { $pull: { reactions: req.params.reactionId  } },
//                     { new: true}
//             )
//         !thought  ? res.status(404).json({ message: 'no thought with this ID' }) : res.json(thought)
        
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(err); 
//     }

//   },
};

