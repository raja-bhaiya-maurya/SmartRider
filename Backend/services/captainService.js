const captainModel = require("../models/captain.model")

module.exports.createCaptain = async ({ firstname, lastname, email, password, captainStatus, vehicle, location }) => {
  if (!firstname || !lastname || !email || !password || !captainStatus || !vehicle || !location) {
    throw new Error('all fields are mandatory')
  }
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password,
    captainStatus,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
    },
    location: {
      lat: location.lat,
      lng: location.lng
    }
  })
  return captain
}