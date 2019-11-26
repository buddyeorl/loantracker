const express = require('express');
const app = express();
const port = 3001
const bodyParser = require('body-parser')

// Dependencies
// =============================================================
require("./connection.js");
let Loan = require("./schema.js").Loan;
let History = require("./schema.js").History;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('hello b1 world'));
app.get('/api/all', (req, res) => {
    console.log('getting all')
    Loan.findAll({}).then(results => res.send(results))
})

app.get('/api/allRecords', (req, res) => {
    console.log('getting all')
    History.findAll({where:{loanContract:req.query.loanContract}}).then(results => res.send(results))
})

app.post('/api/update', (req, res) => {
    console.log('updating')
    console.log(JSON.stringify(req.query.next))
    console.log(req.query.contract)
    if (req.query.balance < 0) {
        console.log('sending error')
        res.send({ error: 'cant pay already paid Loan' })
        return
    }
    console.log('no error')
    Loan.update(
        {
            next: req.query.next,
            total: req.query.total,
            balance: req.query.balance,
            monthly: (req.query.balance === '0') ? 0 : req.query.monthly
        },
        { where: { contract: req.query.contract } }
    //).then((rowsUpdated) => {
        // res.send(
        //     rowsUpdated
        // )
    ).then(()=>
    History.create({
        type:'payment',
        amountPaid:-req.query.monthly,
        balance:req.query.balance,
        loanContract:req.query.contract
    }).then((results) => {
        console.log("finish adding new loan")
        res.send(
            results.toJSON()
        )
    })
    )

})


app.post('/api/updateContract', (req, res) => {
    console.log('updating contract')
    console.log(JSON.stringify(req.query.next))
    console.log(req.query.contract)
    if (req.query.balance < 0) {
        console.log('sending error')
        res.send({ error: 'cant pay already paid Loan' })
        return
    }
    console.log('no error')
    console.log(parseInt(req.query.balance)+parseInt(req.query.change))
    Loan.update(
        {
            balance: parseInt(req.query.balance)+parseInt(req.query.change),
        },
        { where: { contract: req.query.contract } }
    //).then((rowsUpdated) => {
        // res.send(
        //     rowsUpdated
        // )
    ).then(()=>
    History.create({
        type:req.query.type,
        amountPaid:req.query.change,
        balance:parseInt(req.query.balance)+parseInt(req.query.change),
        loanContract:req.query.contract
    }).then((results) => {
        console.log("finish adding new loan")
        res.send(
            results.toJSON()
        )
    })
    )

})



app.post('/api/addLoan', (req, res) => {
    console.log(req.body)
    Loan.create(req.body).then((results) => {
        console.log("finish adding new loan")
        res.send(
            results.toJSON()
        )
    });
});

app.listen(port, () => console.log(`Listening app on port ${port}!`));