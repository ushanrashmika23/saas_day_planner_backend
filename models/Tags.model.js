const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  color: {
    type: String,
  }
}, {
  timestamps: true
});

// Virtual for id to match the interface
tagsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Tags', tagsSchema);
