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

app.get('/message', (req, res) => {
    try {
        // Read the message from the text file
        const message = fs.readFileSync(path.join(__dirname, 'data', 'message.txt'), 'utf8');
        console.log('Message read from file:', message);
        res.status(200).json({ message: message });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error reading message from file');
    }
});

module.exports = app;