const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server available: gpt-digiboard-backend-01');
});

app.post('/message', (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.body.message:', req.body.message);

    try {
        // Ensure the data directory exists
        const dirPath = path.join(__dirname, 'data');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        // Then write the message to a text file
        fs.writeFileSync(path.join(dirPath, 'message.txt'), req.body.message);
        console.log('Message written to file');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error writing message to file');
    }

    res.status(200).send('Message received');
});

module.exports = app;