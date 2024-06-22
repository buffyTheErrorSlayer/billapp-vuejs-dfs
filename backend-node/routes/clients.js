const express = require('express')
const router = express.Router()

const ctrl = require ('../controllers/clients.js')


router.get('/', ctrl.getAll)

router.get('/:id', ctrl.getOne)

router.patch('/:id', ctrl.patchOne)

router.delete('/:id', ctrl.deleteOne)





module.exports = router;