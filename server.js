const express = require('express');
const app = express();
const port = process.env.PORT ||80;


app.use(express.static('search_app'));

// TEST BEGIN


app.get('/api/graph', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '\\data\\filtered_graph.json'); 
});

// END

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('./search_app/about.html', { root: __dirname });
});

app.listen(port, () => console.log(`listening on port ${port}!`));