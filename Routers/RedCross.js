const ex = require('express')
const r = ex.Router()
const path = require('path')

//hardcode
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

//get image of red cross
r.get('/img/:loc', (req, res) => {
  let loc = req.params.loc
  var options = {
    root: path.resolve('./public/img'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile(loc+'.jpg', options, function (err) {
    if (err) {
      res.send({err: {
        props: 'img',
        msg: 'Image not found'
      }})
    } 
  })
}) 

//get info of nearby red cross
r.get('/:city', (req, res) => {
  let location = req.params.city

  //filter the list so we show
  //nearby PMI
  let nearRedCross = redCross.filter((_)=>_.city === location)

  res.send(nearRedCross)
})

r.get('/', (req, res) => {

  //filter the list so we show
  //nearby PMI

  res.send(redCross)
})

module.exports = r