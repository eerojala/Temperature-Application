const observationsRouter = require('express').Router()
const Observation = require('../models/observation')
const Location = require('../models/location')

observationsRouter.get('/', async (request, response) => {
  const observations = await Observation
    .find({})
    .populate('location', { observations: 0, __v: 0 })

  response.json(observations.map(Observation.format))
})

observationsRouter.post('/', async (request, response) => {
  try {
    const observation = new Observation(request.body)

    if (!observation.temperature || observation.temperature < -100 || observation.temperature > 60) {
      return response.status(400).json({ error: 'Invalid temperature' })
    }

    if (!observation.date) {
      return response.status(400).json({ error: 'Invalid date' })
    }

    const location = await Location.findById(observation.location)

    if (!location) {
      return response.status(400).json({ error: 'Invalid location' })
    }

    const savedObservation = await observation.save()

    location.observations = location.observations.concat(savedObservation._id)
        
    await location.save()

    response.json(Observation.format(observation))
  } catch (exception) {
    console.log(exception)
    response.sttatus(500).json({ error: 'Something went wrong...' })
  }
})

module.exports = observationsRouter