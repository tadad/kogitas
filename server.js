const express = require('express');
const app = express();
const port = process.env.PORT || 80;


app.use(express.static('search_app'));

app.get('/api/', (req, res) => {
    if (req.query.q != "undefined") {
        res.sendFile(__dirname + '/data/' + req.query.q + '.json'); 
    } else {
        res.sendFile(__dirname + '/data/index.json')
    }
});


app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('./search_app/about.html', { root: __dirname });
});

app.listen(port, () => console.log(`listening on port ${port}!`));