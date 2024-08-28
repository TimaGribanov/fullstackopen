const { Int32 } = require('bson')
const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  text: String
})

const blogSchema = new mongoose.Schema({
  author: String,
  title: { type: String, required: true },
  url: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [commentsSchema]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)