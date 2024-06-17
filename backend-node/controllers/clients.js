const fs = require('fs');
const path = require('path')
const { v4: uuid } = require('uuid')
module.exports = {

    // récupère la liste de toutes les factures
    getAll: (req, res) => {
        try {
            const data = fs.readFileSync(
                path.resolve(__dirname, '../db/clients.json')
            )
            const clients = JSON.parse(data)
            res.send(clients)
        } catch (err) {
            res.sendStatus(500)
            throw err;
        }
    },

    // récupérer une seule facture en fonction de son id
    // getOne: (req, res) => {},

    // // mettre àjour une facture en fonction de son id
    // postOne: (req, res) => {},

    // // mettre àjour une facture en fonction de son id
    // patchOne: (req, res) => {},

    // // supprimer une facture en fonction de son id
    // deleteOne: (req, res) => {},
}