const locationsRouter = require('express').Router()
const Location = require('../models/location')

locationsRouter.get('/', async (request, response) => {
  const locations = await Location
    .find({})
    .populate('observations', { __v: 0, location: 0 })
    
  response.json(locations.map(Location.format))
})

locationsRouter.get('/:id', async(request, response) => {
  try {
    const location = await Location
      .findById(request.params.id)
      .populate('observations', { __v: 0, location: 0 })

    if (location) {
      response.json(Location.format(location))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'Malformatted id' })
  }
})

locationsRouter.post('/', async (request, response) => {
  try {
    const location = new Location(request.body)

    if (!location.name) {
      return response.status(400).json({ error: 'Invalid name' })
    }

    if (!location.latitude || !location.longitude) {
      return response.status(400).json({ error: 'Invalid coordinates'})
    }

    await location.save()
        
    response.json(Location.format(location))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went wrong...' })
  }
})

module.exports = locationsRouter