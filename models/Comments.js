const {Schema, model, Types} = require('mongoose')
 
const schema = new Schema({
  comments :{ type: String, required: true },
  Time_id: {type: Types.ObjectId, ref: 'News'},
})
module.exports = model('Comments', schema) 