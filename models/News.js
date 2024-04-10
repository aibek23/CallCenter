const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  user_id: { type: String, required: true },
  image_src: { type: String, required: true, },
  title:{ type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
})

module.exports = model('News', schema)