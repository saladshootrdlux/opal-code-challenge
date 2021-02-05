// Basic Node application for deployment to Docker container on ECS to display content and open a port.

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello Opal!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

