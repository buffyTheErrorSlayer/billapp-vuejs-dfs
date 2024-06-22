const express = require('express')
const router = express.Router()

const ctrl = require ('../controllers/clients.js')


router.get('/', ctrl.getAll)

router.delete('/:id', ctrl.deleteOne)





module.exports = router;