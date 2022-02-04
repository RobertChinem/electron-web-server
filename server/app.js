const express = require('express')
const open = require('open');
const path = require('path')
const ip = require('ip')
const fs = require('fs')

const PORT = 3000
const URL = `http://localhost:${PORT}`

const app = express()

const inMemoryStorage = {}

function getContentFile(path){
    return fs.readFileSync(path ,{encoding:'utf8', flag:'r'})
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
})

app.post('/upload', (req, res) => {
    const { path } = req.body
    try {
        inMemoryStorage['file'] = getContentFile(path)
        res.json({ ok: true })
    } catch {
        res.json({ ok: false })
    }
})

app.get('/preview', (req, res) => {
    res.send(inMemoryStorage['file'])
})

app.get('/api/server-info', (req, res) => {
    res.json({
        ip: ip.address(),
        port: PORT
    })
})

app.listen(3000)
