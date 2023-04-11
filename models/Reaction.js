
const { Schema, model } = require('mongoose');


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    reactionBody: {type: String, required: true, maxLength: 280},
    username: {
        type: String,
        required: true},
        createdAt: {type: Date, default: Date.now}
},

{
    toJSON: {
      getters: true,
    },
    id: false,
  })

  


// // create the Users model using the Users Schema
// const Reaction = model('Reaction', reactionSchema);

module.exports = reactionSchema;