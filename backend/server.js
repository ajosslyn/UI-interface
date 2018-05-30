const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const pgp = require('pg-promise')({
    promiseLib: Promise
});

const db = pgp({
    database : "Library"
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/hello', (request, response, next)=>{
    response.json("Hello Carl");
});

app.get('/getData', (req, resp, next) => {
    db.any('select * from books')
    .then(data => resp.json(data))
    .catch(next)

})
app.post('/getSearch', (req, resp, next)=>{
    let query = req.body.find;
    console.log(query)
    db.any(`SELECT * FROM books WHERE title ilike $1`,"%"+query+"%")
    .then(data => resp.json(data))
    .catch(next)
})

app.listen(4000, () => console.log('Listening on 4000.'));