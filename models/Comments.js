const {Schema, model, Types} = require('mongoose')

 
const schema = new Schema({
  Rating:{type: Number, required: true},
  Comments :{ type: String, required: true },
  Time_id: {type: Types.ObjectId, ref: 'Time',unique: true},
})
module.exports = model('Comments', schema) 