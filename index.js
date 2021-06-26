import express from 'express'
const app = express()
import mongoose from 'mongoose'
const port = process.env.PORT || 8080
const API_KEY = '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'
import sgMail from '@sendgrid/mail'
import cors from 'cors'
import bodyParser from 'body-parser'
import emailSchemaDB from './emailSchema.js'
app.use(cors())
let data = {}
// app.use(express.json())

const connection_url = 'mongodb+srv://admin:caKGhdd4B9PDSBWx@cluster0.4yxul.mongodb.net/hackathondb?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () => {
    console.log("Database connected!")
    const dataCollection = db.collection('emailContents')
    const changeStream = dataCollection.watch();
    changeStream.on('change', (change) => {
        console.log("A change occured", change)

    })
})





app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/api/v1/data', (req, res) => {
    console.log(req.body)
    const dbMessage = req.body

    // sgMail.send(req.body).then((res) => {
    //     console.log("email send")
    // }).catch((err) => {
    //     console.log(err.message)
    // })
    emailSchemaDB.create(dbMessage, (err, data) => {

        if (err) {
            res.status(500).send(err) // internal server errpr
        }
        else {
            res.status(201).send(data)
        }
    })
})


app.get("/api/v1/emails", (req, res) => {
    emailSchemaDB.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data) // for get / downloading data we set 200 status code and it represents OKAY
        }
    })
})



sgMail.setApiKey(API_KEY)
const message = {
    to: 'indiafirstshelp@gmail.com',
    from: 'itzmepratyush@gmail.com',
    subject: 'Hello ',
    text: 'Hello',

}


// listen 
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})







// Database Password : caKGhdd4B9PDSBWx
// Database: mongodb + srv://admin:<password>@cluster0.4yxul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority