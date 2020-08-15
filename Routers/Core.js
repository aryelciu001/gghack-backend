const ex = require('express')
const router = ex.Router()
const admin = require('firebase-admin')
const db = admin.firestore()

//request donor
router.post('/req', (req, res)=>{

  //handling request

  //let request = req.body
  let request = {
    reqFor: "blood",
    bloodType: "A",
    rhesus: "+",
    location: "Jakarta"
  }

  let title = {
    blood: "Blood Needed!"
  }

  //handling broadcast
  let regisToken = 'dwd'
  let payload = {
    title: title[request.reqFor],
    info: {
      ...request
    }
  }

  let options = {
    priority: 'high',
    timeToLive: 60*60*24
  }

  /*

  @TODO: Filtering users around the location

  */
  
  admin.messaging().sendToDevice(regisToken, payload, options)
  .then((response)=>{
    console.log("ok", response)
  })
  .catch((err)=>{
    console.log("not ok", err)
  })

})

module.exports = router

