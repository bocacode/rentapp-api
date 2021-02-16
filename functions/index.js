const functions = require("firebase-functions")
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { getUsers, createUser, updateUser, deleteUser } = require('./src/users')
const { getProperties, createProperty, updateProperty, deleteProperty } 
  = require('./src/properties')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/users', getUsers)
app.post('/users', createUser)
app.patch('/users/:userId', updateUser)
app.delete('/users/:userId', deleteUser)

app.get('/properties', getProperties)
app.post('/properties', createProperty)
app.patch('/properties/:propertyId', updateProperty)
app.delete('/properties/:propertyId', deleteProperty)

exports.app = functions.https.onRequest(app)
