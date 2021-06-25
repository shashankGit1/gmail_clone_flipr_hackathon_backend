import express from 'express'
const app = express()
import mongoose from 'mongoose'
const port = process.env.PORT || 8080
const API_KEY = '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'
import sgMail from '@sendgrid/mail'
import cors from 'cors'
import bodyParser from 'body-parser'
app.use(cors())
let data = {}


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/api/v1/data', (req, res) => {
    console.log(req.body)
    res.status(200).send({
        id: 3443,
        message: 'success'
    })

    sgMail.send(req.body).then((res) => {
        console.log("email send")
    }).catch((err) => {
        console.log(err.message)
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
