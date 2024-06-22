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

    // getOne: (req, res) => {},

    // postOne: (req, res) => {},

    // patchOne: (req, res) => {},

    deleteOne: (req, res) => {
        try {
            const data = fs.readFileSync(
                path.resolve(__dirname, '../db/clients.json')
            )
            let clients = JSON.parse(data)
            const id = req.params.id
            clients = clients.filter(client => client.idclient != id)

            fs.writeFileSync(
                path.resolve(__dirname, '../db/clients.json'),
                JSON.stringify(clients)
            )
            res.sendStatus(200);
            
        } catch (err) {
            res.sendStatus(500)
            throw err;
        }
    }
}