const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  name: String,
  observations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }]
})

locationSchema.statics.format = (location) => {
  return {
    id: location.id,
    name: location.name,
    observations: location.observations
  }
}

const Location = mongoose.model('Location', locationSchema)

module.exports = Location