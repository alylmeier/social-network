
const { Schema, model } = require('mongoose');


const userSchema = new Schema({

    username: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true },
        //there is supposed to be email validation as well
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
},

{
    toJSON: {
      getters: true,
      virtuals: true,
    },
    // id: false,
  })

  userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create the Users model using the Users Schema
const User = model('User', userSchema);

module.exports = User;