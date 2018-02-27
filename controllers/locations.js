const locationsRouter = require('express').Router()
const Location = require('../models/location')

locationsRouter.get('/', async (request, response) => {
    const locations = await Location.find({})
    
    response.json(locations.map(Location.format))
})

locationsRouter.post('/', async (request, response) => {
    try {
        const location = new Location(request.body)

        if (!location.name) {
            return response.status(400).json({ error: 'Missing name' })
        }

        await location.save()
        
        response.json(Location.format(location))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'Something went wrong...' })
    }
})

module.exports = locationsRouter