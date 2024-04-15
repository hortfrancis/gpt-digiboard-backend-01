const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server available: gpt-digiboard-backend-01');
});

app.post('/message', (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.body.message:', req.body.message);
    res.send('Message received');
});

module.exports = app;