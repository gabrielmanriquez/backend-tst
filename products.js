const clone = require('clone')
const config = require('./config')

const dbProducts = {}

const defaultProductsData = {
  products: [
    {
      id: "l2jsli14vbe3h53df4",
      nombre: "Container XS"
    },
    {
      id: "l2jslr5tlkigkje7iw",
      nombre: "Container S"
    },
    {
      id: "l2jsmancyhoolq8hadh",
      nombre: "Container M"
    },
    {
      id: "l2jsm39dl9r5hjzygd",
      nombre: "Container L"
    },
    {
      id: "l2jsmhsw5w7h1rr35qk",
      nombre: "Container XL"
    }
  ]
 
}

const getall = (token) => {
  let data = dbProducts[token]

  if (data == null) {
    data = dbProducts[token] = clone(defaultProductsData)
  }

  return data
}


module.exports = {
  getall,
}
