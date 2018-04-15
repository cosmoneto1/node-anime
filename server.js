const express = require('express')
const app = express()
const anime = require('./animes/animakai')

app.use('/', express.static('public'))

app.get('/api/animakai', (req, res) => {
    anime.animakai((data) => {
        res.json(data)
    })
})

app.listen(3000, () => console.log('Server anime on port 3000!'))