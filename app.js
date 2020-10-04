require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// EJS
app.set('view engine', 'ejs');

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static Public Folder
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', require('./routes/index'));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));