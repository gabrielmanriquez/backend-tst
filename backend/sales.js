const clone = require('clone')
const config = require('./config')

const db = {}

const generateId = () => {
  const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  return id
}

const defaultSalesData = {
  sales: [
    {
      id: "l2jsk655x5b1guwxln",
      direccion_cliente: "Eliodoro Yañez 1989, Providencia",
      nombre_cliente: "Empresa 1",
      productos: [
        {"id": "l2jsli14vbe3h53df4", "cantidad": 1},
        {"id": "l2jsmancyhoolq8hadh", "cantidad": 2}
      ],
      fecha: "15/04/2022 14:30",
      estado: "pendiente",
      id_vendedor: "l2ju3gont5z2ibupp89"
    },
    {
      id: "l2jsktcxofw0fn5pba",
      direccion_cliente: "Av. Apoquindo 2929, Las Condes",
      nombre_cliente: "Empresa 2",
      productos:  [
        {"id": "l2jsm39dl9r5hjzygd", "cantidad": 5}
      ],
      fecha: "16/04/2022 16:22",
      estado: "completado",
      id_vendedor: "l2ju3gont5z2ibupp89"
    },
    {
      id: "l2jsl6nkvarxcxzt3p",
      direccion_cliente: "Los Conquistadores 2162, Providencia",
      nombre_cliente: "Empresa 3",
      productos: [
        {"id": "l2jsli14vbe3h53df4", "cantidad": 1},
        {"id": "l2jsmancyhoolq8hadh", "cantidad": 2},
        {"id": "l2jsli14vbe3h53df4", "cantidad": 4}
      ],
      fecha: "16/04/2022 9:51",
      estado: "completado",
      id_vendedor: "l2ju3gont5z2ibupp89"
    }
   
  ]
}

const getall = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultSalesData)
  }

  return data
}

const add = (token, sale) => {
  const saleId = generateId()

  let newSale = {
    "id": saleId,
    "direccion_cliente": sale.direccion_cliente,
    "nombre_cliente": sale.nombre_cliente,
    "productos": sale.productos,
    "fecha": sale.fecha,
    "estado": sale.estado,
    "id_vendedor": sale.id_vendedor
  }

  getall(token).sales.push(newSale)

  return newSale
}

const update = async (token, body) => {
  const data = getall(token)
  const sale = await data.sales.find(c => c.id === body.id)
  let updated = {}

  if (sale) {
    updated = sale
    Object.keys(body).map( (keyName, keyIndex ) => {
      if(sale[keyName] != undefined ){
        updated[keyName] = body[keyName]
      }
    })

    data.sales = await data.sales.filter(c => c !== sale)
    data.sales.push(updated)
  }

  return updated
}

module.exports = {
  getall,
  add,
  update
}
