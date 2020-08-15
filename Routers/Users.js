const ex = require('express')
const router = ex.Router()
const admin = require('firebase-admin')
const db = admin.firestore()

const {encrypt, checkEncryption} = require('../helpers/encryption.js')
const {getCollection, addToCollection, deleteFromCollection} = require('../helpers/firebase')

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
  if (theUser) { 
    if ((await checkEncryption(user.password, theUser.password))) {
      delete theUser.password
      return res.status(200).send(theUser)
    } else {
      return res.status(401).send({
        error: {
          props: 'password',
          msg: 'Password incorrect'
        }
      })
    }
  } else {
    return res.status(401).send({error: {
      props: 'email',
      msg: 'Email not found'
    }})
  }

})

router.post("/signup", async (req, res)=>{
  const newUser = { ...req.body }

  //check email taken
  let data = await getCollection('users')

  for (let _ of data) {
    if (_.email === newUser.email) {
      return res.status(400).send({error: {
          props: 'email',
          msg: 'Email is already registered'
        }})
    }
  }
  
  try {
    //encrypt password
    newUser.password = await encrypt(newUser.password) 
  } catch (e) {
    return res.status(400).send({error: {
          props: 'password',
          msg: 'No password given!'
        }})
  }

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
    return res.status(401).send({error: {
      props: 'server',
      msg: 'user not added'
    }})
  }
})

router.post("/delete", async (req, res)=>{
  const {email} = req.body
  let stat = await deleteFromCollection(email, 'email', 'users')
  if (stat) {
    res.status(200).send({})
  } else {
    res.status(404).send({error: {
      props: 'user',
      msg: 'user not found'
    }})
  }
})

router.post("/test", (req, res) => {
  res.status(200).send({})
})

module.exports = router