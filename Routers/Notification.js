const ex = require('express')
const router = ex.Router()
const admin = require('firebase-admin')
const db = admin.firestore()

router.post("/", (req, res)=>{
  
  let regisToken = 'dwd'
  let payload = {
    data: {
      key: "Hello"
    }
  }
  let options = {
    priority: 'high',
    timeToLive: 60*60*24
  }
  
  admin.messaging().sendToDevice(regisToken, payload, options)
  .then((response)=>{
    console.log("ok", response)
  })
  .catch((err)=>{
    console.log("not ok", err)
  })

})

module.exports = router