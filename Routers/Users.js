const ex = require('express')
const router = ex.Router()
const admin = require('firebase-admin')
const db = admin.firestore()

const {encrypt, checkEncryption} = require('../helpers/encryption.js')
const {getCollection, addToCollection} = require('../helpers/firebase')

router.post("/signin", async (req, res)=>{
  const user = { ...req.body }
  let theUser = null

  data = await getCollection('users')

  //check email
  for (let _ of data) {
    if (_.email === user.email) {
      theUser = { ..._ }
      break
    } 
  }

  //check password
  if (theUser) { //means there is no email found
    if ((await checkEncryption(user.password, theUser.password))) {
      delete theUser.password
      return res.status(200).send(theUser)
    } else {
      return res.status(401).send({error: 'password incorrect'})
    }
  } else {
    return res.status(401).send({error: 'email not found'})
  }

})

router.post("/signup", async (req, res)=>{
  const newUser = { ...req.body }

  //check email taken
  let data = await getCollection('users')

  for (let _ of data) {
    if (_.email === newUser.email) {
      return res.status(400).send({error: "Email is taken!"})
    }
  }

  //encrypt password
  newUser.password = await encrypt(newUser.password)

  //adding user
  let addUser;
  try {
    addUser = await addToCollection(newUser, 'users')
  } catch (e) {
    addUser = {error: e}
  }

  if (!(addUser.error)) {
    return res.status(200).send({})
  } else {
    return res.status(401).send(addUser)
  }
})

module.exports = router