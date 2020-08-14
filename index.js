//basic
const ex = require('express')
const bp = require('body-parser')
const admin = require('firebase-admin')

const app = ex()

//firestore setting
const service = require('./gghack-91860a4892ae.json')
require('firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyDiuFnRIrFjSXm2EYZonM-hZGQ5hN95AWg",
  authDomain: "gghack-e6957.firebaseapp.com",
  databaseURL: "https://gghack-e6957.firebaseio.com",
  projectId: "gghack-e6957",
  storageBucket: "gghack-e6957.appspot.com",
  messagingSenderId: "1032618567504",
  appId: "1:1032618567504:web:38175b813fa6621914ee55",
  measurementId: "G-2FXLZJNN83",
  credential: admin.credential.cert(service)
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);
const db = admin.firestore();

//body parser
app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

//importing routers
const users = require('./Routers/Users')
const core = require('./Routers/Core')
const notification = require('./Routers/Notification')

//using routers
app.use('/users', users)
app.use('/core', core)
app.use('/notification', notification)

//port
const port = process.env.PORT || 3001

app.listen(port, ()=>{
  console.log(`server started on port ${port}`)
})