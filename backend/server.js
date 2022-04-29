const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const sales = require('./sales')
const products = require('./products')
const auth = require('./auth')

const app = express()

app.use(express.static('public'))
app.use(cors())



const checkToken =  (req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'El request debe tener Authorization header (token).'
    })
  }
};


app.post('/login', bodyParser.json(), (req, res) => {
  const { email, password } = req.body

  if (password && email) {
    let response = auth.login(req.body)
    if(response === false){
      res.status(403).send("Usuario no encontrado o contraseña incorrecta.")
    }
    else{
      res.status(200).json(response)
    }
  } else {
    res.status(403).send({
      error: 'Se debe proveer email y password.'
    })
  }
})


app.get('/sales/getall', checkToken, (req, res) => {
  res.send(sales.getall(req.token))
})


app.get('/products/getall', checkToken, (req, res) => {
  res.send(products.getall(req.token))
})


app.post('/sales/create', bodyParser.json(), checkToken, (req, res) => {
  const { direccion_cliente, nombre_cliente, productos, fecha, id_vendedor } = req.body

  if (direccion_cliente && nombre_cliente && productos && fecha && id_vendedor) {
    res.send(sales.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: 'Se debe proveer los campos requeridos.'
    })
  }
})


app.post('/sales/update', bodyParser.json(), checkToken, async (req, res) => {
  const { id } = req.body

  if (id) {
    const upd = await sales.update(req.token,req.body)
    res.status(200).json(upd)
  } else {
    res.status(403).send({
      error: 'Debe proveer id de venta.'
    })
  }
})

app.listen(config.port, () => {
  console.log('Servidor escuchando en puerto: %s', config.port)
})
