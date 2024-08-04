const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello from my API')
})
app.listen(port, () => {
    console.log('hello')
})
