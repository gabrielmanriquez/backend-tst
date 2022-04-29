const clone = require('clone')
const config = require('./config')


const defaultUsersData = {
  users: [
    {
      vendedor_id: "l2ju3gont5z2ibupp89",
      email: "vendedor1@sales.com",
      password: "passtest123"
    },
  ]
}

const generateToken = (user) =>{
    let token = new Buffer.from(JSON.stringify(user)).toString('base64')
    return token
}

const login = (body) => {
  const data = clone(defaultUsersData)
  const {email,password} = body

  const found = data.users.find(c => c.email === email)

  if(found && found.password === password){
    return {
        token : generateToken({email, "vendedor_id": found.vendedor_id}),
        "vendedor_id": found.vendedor_id,
        email
    }
  }
  else{
    return false
  }
}


module.exports = {
  login,
}
