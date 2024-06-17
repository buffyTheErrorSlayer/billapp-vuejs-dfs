const fs = require('fs');
const path = require('path')
const { v4: uuid } = require('uuid')
module.exports = {

    // récupère la liste de toutes les factures
    getAll: (req, res) => {
        try {
            const data = fs.readFileSync(
                path.resolve(__dirname, '../db/bills.json')
            )
            res.send(data)
        } catch (err) {
            res.sendStatus(500)
            throw err;
        }
    },

    // récupérer une seule facture en fonction de son id
    getOne: (req, res) => {

        try {
            const data = fs.readFileSync(
                path.resolve(__dirname, '../db/bills.json')
            )
            const bills = JSON.parse(data)
            const id = req.params.id
            const bill = bills.find(bill => bill.id == id);

            if (bill) {
                res.json(bill)
            } else {
                res.sendStatus(404)
            }

        } catch (err) {
            res.sendStatus(500)
            throw err;
        }
    },

    // mettre àjour une facture en fonction de son id
    postOne: (req, res) => {
        try {
            const data = fs.readFileSync(
                path.resolve(__dirname, '../db/bills.json')
            )
            const bills = JSON.parse(data)
            const newBill = { ...req.body, id: uuid() }

            bills.push(newBill)

            fs.writeFileSync(
                path.resolve(__dirname, '../db/bills.json'),
                JSON.stringify(bills)
            )

            res.json(newBill)

        }
        catch (err) {
            res.sendStatus(500)
            throw err;
        }



    },

    // mettre àjour une facture en fonction de son id
    patchOne: (req, res) => {
        try {
            const data = fs.readFileSync(
                path.resolve(__dirname, '../db/bills.json')
            )
            let bills = JSON.parse(data)

            const id = req.params.id
            let updatedBill = bills.find(bill => bill.id == id);
            let updatedBillIndex = bills.findIndex(bill => bill.id == id)

            if(updatedBill)
            {
                updatedBill = {...updatedBill,...req.body}
                bills[updatedBillIndex] = {...updatedBill}
            } else {
                res.sendStatus(404)
            }

            fs.writeFileSync(
                path.resolve(__dirname, '../db/bills.json'),
                JSON.stringify(bills)
            )

            res.json(updatedBill)

        } catch (err) {
            res.sendStatus(500)
            throw err;
        }
    },

    // supprimer une facture en fonction de son id
    deleteOne: (req, res) => {

        try {
            const data = fs.readFileSync(
                path.resolve(__dirname, '../db/bills.json')
            )
            let bills = JSON.parse(data)

            const id = req.params.id
            bills = bills.filter(bill => bill.id !== id)

            fs.writeFileSync(
                path.resolve(__dirname, '../db/bills.json'),
                JSON.stringify(bills)
            )

            res.sendStatus(200)

        } catch (err) {
            res.sendStatus(500)
            throw err;
        }
    },
}