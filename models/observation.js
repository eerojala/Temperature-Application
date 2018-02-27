const mongoose = require('mongoose')

const observationSchema = new mongoose.Schema({
  temperature: Number,
  date: Date,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }
})

observationSchema.statics.format = (observation) => {
  return {
    id: observation.id,
    temperature: observation.temperature,
    date: observation.date,
    location: observation.location
  }
}

const Observation = mongoose.model('Observation', observationSchema)

module.exports = Observation