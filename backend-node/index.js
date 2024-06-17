const express = require('express')
const cors = require('cors')

// import des routes qui viennent du dossier routes
const billRoutes =  require('./routes/bills.js')
const clientRoutes =  require('./routes/clients.js')

const app = express()
app.use(express.json())
const port = 3000

app.use(cors({
  origin : 'http://localhost:5173'
}))

app.use('/bills', billRoutes)
app.use('/clients', clientRoutes)

app.get('/', (req, res) => {
  res.send({
    api : "Bill App API",
    version : "1.0.0"
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
