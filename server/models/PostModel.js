const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  }
});

const PostModel = mongoose.model('post', PostSchema);

module.exports = PostModel;
