const ex = require('express')
const r = ex.Router()
const path = require('path')
const { moveCursor } = require('readline')
const { request } = require('express')
const {addToCollection, getCollection} = require('../helpers/firebase')

let redCross = [
  {
    name: 'PMI DKI Jakarta',
    tel: "+62213906666",
    email: "info@pmidkijakarta.or.id",
    city: 'jakarta',
    lat: -6.185077,
    long: 106.844667,
    bloodStock: {
      'a': {
        '+': 4,
        '-': 10
      },
      'b': {
        '+': 0,
        '-': 9
      },
      'ab': {
        '+': 0,
        '-': 1
      },
      'o': {
        '+': 10,
        '-': 20
      }
    }
  },{
    name: 'PMI Medan',
    tel: "+62614567638",
    email: "",
    city: "medan",
    lat: 3.584236,
    long: 98.680051,
    bloodStock: {
      'a': {
        '+': 2,
        '-': 10
      },
      'b': {
        '+': 0,
        '-': 12
      },
      'ab': {
        '+': 0,
        '-': 1
      },
      'o': {
        '+': 8,
        '-': 21
      }
    }
  },{
    name: 'PMI Medan',
    tel: "+6222589 1313",
    email: "admin@pmikabbandung.or.id",
    city: 'bandung',
    lat: -6.908782,
    long: 107.619645,
    bloodStock: {
      'a': {
        '+': 2,
        '-': 10
      },
      'b': {
        '+': 0,
        '-': 12
      },
      'ab': {
        '+': 0,
        '-': 1
      },
      'o': {
        '+': 8,
        '-': 20
      }
    }
  }
]

r.get("/", (req, res)=>{
    return await getCollection('bloodrequest')
})

r.post("/ask", (req, res)=>{
  //location, bloodtype, rhesus, quantity
  let request = { ...req.body }
  let required = ['location', 'bloodType', 'quantity', 'rhesus']
  for (let props of required) {
    if (!Object.keys(request).includes(props)) {
      return res.status(400).send({
        props,
        msg: `${props} is required!`
      })
    }
  } 

  let nearRedCross = redCross.filter((_)=>_.city === request.location)

  nearRedCross = nearRedCross.filter((_)=>_.bloodStock[request.bloodType][request.rhesus] >= request.quantity)

  res.send(nearRedCross)

})

r.post("/request", async (req, res)=>{
  //location, bloodtype, rhesus, quantity
  let request = { ...req.body }
  let required = ['location', 'bloodType', 'quantity', 'rhesus', "contactName", "contactPhone", "title", "desc"]
  for (let props of required) {
    if (!Object.keys(request).includes(props)) {
      return res.status(400).send({
        props,
        msg: `${props} is required!`
      })
    }
  } 

  addToCollection(request, 'bloodRequest')
    .then((res)=>(res.status(200).send({})))
    .catch((e)=>(res.status(400).send(e)))
})

r.get("/attent/:requestId", async (req, res) => {
  let id = req.params.requestId
  let bloodRequest = await getCollection('bloodRequest')

  bloodRequest = bloodRequest.filter(_ => _.id === id)[0]
                            
  res.status(200).send({bloodRequest})
})

module.exports = r