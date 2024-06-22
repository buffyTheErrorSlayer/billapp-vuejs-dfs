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

    getOne: (req, res) => {

        try {
            const data = fs.readFileSync(
                path.resolve(__dirname, '../db/clients.json')
            )
            const clients = JSON.parse(data)

            const id = req.params.id
            const client = clients.find(client => client.idclient == id);

            if (client) {
                res.json(client)
            } else {
                res.sendStatus(404)
            }
        } catch (err) {
            res.sendStatus(500)
            throw err;
        }

    },

    // postOne: (req, res) => {},

    patchOne: (req, res) => {
        try {
            const data = fs.readFileSync(
                path.resolve(__dirname, '../db/clients.json')
            )
            let clients = JSON.parse(data)

            const id = req.params.id
            let updatedClient = clients.find(client => client.idclient == id);
            let updatedClientIndex = clients.findIndex(client => client.idclient == id)

            if (updatedClient) {
                updatedClient = {...updatedClient,...req.body }
                clients[updatedClientIndex] = {...updatedClient }
                fs.writeFileSync(
                    path.resolve(__dirname, '../db/clients.json'),
                    JSON.stringify(clients)
                )
                res.json(updatedClient)
            } else {
                res.sendStatus(404)
                return
            }

        } catch (err) {
            res.sendStatus(500)
            throw err;
        }
    },

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
    },

}