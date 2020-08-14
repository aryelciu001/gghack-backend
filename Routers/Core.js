const ex = require('express')
const router = ex.Router()
const admin = require('firebase-admin')
const db = admin.firestore()

//request donor
router.post('/req', (req, res)=>{

})

//send Notification to donor
router.post('broadcast', (req, res)=>{
  
})

module.exports = router

