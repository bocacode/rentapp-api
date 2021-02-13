const functions = require("firebase-functions");
const express = require('express')
const bodyParser = require('body-parser')
const { getUsers, createUser } = require('./src/users')

const app = express()
app.use(bodyParser.json())

app.get('/users', getUsers)
app.post('/users', createUser)

exports.app = functions.https.onRequest(app)
