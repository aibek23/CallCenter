const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  image_src: { type: String, required: true, },
  user_id: [{ type: Types.ObjectId, ref: 'User' }],
  description: { type: String, required: true },
})

module.exports = model('Profile', schema)
