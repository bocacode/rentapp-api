const admin = require('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://rentapp-api-ta.firebaseio.com'
  })
}
const db = admin.firestore()

exports.getProperties = (req, res) => {
  if(!db) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://rentapp-api-ta.firebaseio.com'
    })
    db = admin.firestore()
  }
  db.collection('properties').get()
    .then(snapshot => {
        const propertyResults = snapshot.docs.map(doc => {
          let singleProperty = doc.data()
          singleProperty.id = doc.id
          return singleProperty
        })
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
        res.status(200).json(propertyResults)
    })
    .catch(err => {
      console.log('Error retrieving Properties: ' + err)
      res.status(500).send('Error retrieving Properties: ' + err)
    })

}

exports.updateProperty = (req, res) => {
  if(!db) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://rentapp-api-ta.firebaseio.com'
    })
    db = admin.firestore()
  }
  const { propertyId } = req.params
  const propertyUpdates = req.body
  db.collection('properties').doc(propertyId).update(propertyUpdates)
    .then(docRef => {
      console.log('Updated Property', docRef.id)
      res.status(200).send('Updated Property ' + docRef.id)
    })
    .catch(err => {
      console.log('Error updating property: ', err)
      res.status(500).send('Error updating property: ' + err)
    })
}

exports.deleteProperty = (req, res) => {
  if(!db) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://rentapp-api-ta.firebaseio.com'
    })
    db = admin.firestore()
  }
  const { propertyId } = req.params
  db.collection('properties').doc(propertyId).delete()
    .then(docRef => {
      console.log('Deleted Property', propertyId)
      res.status(200).send('Deleted Property ' + propertyId)
    })
    .catch(err => {
      console.log('Error deleting property: ', err)
      res.status(500).send('Error deleting property: ' + err)
    })
}

exports.createProperty = (req, res) => {
  if(!db) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://rentapp-api-ta.firebaseio.com'
    })
    db = admin.firestore()
  }
  const newProperty = req.body
  db.collection('properties').add(newProperty)
    .then(docRef => {
      console.log('Created Property', docRef.id)
      res.status(200).send('Created Property ' + docRef.id)
    })
    .catch(err => {
      console.log('Error creating Property: ', err)
      res.status(500).send('Error creating Property: ' + err)
    })
}
