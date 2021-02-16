const admin = require('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://rentapp-api-ta.firebaseio.com'
  })
}
const db = admin.firestore()

exports.getUsers = (req, res) => {
  if(!db) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://rentapp-api-ta.firebaseio.com'
    })
    db = admin.firestore()
  }
  db.collection('users').get()
    .then(snapshot => {
        const userResults = snapshot.docs.map(doc => {
          let singleUser = doc.data()
          singleUser.id = doc.id
          return singleUser
        })
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
        res.status(200).json(userResults)
    })
    .catch(err => {
      console.log('Error retrieving Users: ' + err)
      res.status(500).send('Error retrieving Users: ' + err)
    })

}

exports.updateUser = (req, res) => {
  if(!db) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://rentapp-api-ta.firebaseio.com'
    })
    db = admin.firestore()
  }
  const { userId } = req.params
  const userUpdates = req.body // { lastName: 'Frankenstein', age: 45 }
  db.collection('users').doc(userId).update(userUpdates)
    .then(docRef => {
      console.log('Updated User', docRef.id)
      res.status(200).send('Updated User ' + docRef.id)
    })
    .catch(err => {
      console.log('Error updating user: ', err)
      res.status(500).send('Error updating user: ' + err)
    })
}

exports.deleteUser = (req, res) => {
  if(!db) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://rentapp-api-ta.firebaseio.com'
    })
    db = admin.firestore()
  }
  const { userId } = req.params
  db.collection('users').doc(userId).delete()
    .then(docRef => {
      console.log('Deleted User', userId)
      res.status(200).send('Deleted User ' + userId)
    })
    .catch(err => {
      console.log('Error deleting user: ', err)
      res.status(500).send('Error deleting user: ' + err)
    })
}

exports.createUser = (req, res) => {
  if(!db) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://rentapp-api-ta.firebaseio.com'
    })
    db = admin.firestore()
  }
  const newUser = req.body
  db.collection('users').add(newUser)
    .then(docRef => {
      console.log('Created User', docRef.id)
      res.status(200).send('Created User ' + docRef.id)
    })
    .catch(err => {
      console.log('Error creating user: ', err)
      res.status(500).send('Error creating user: ' + err)
    })
}
