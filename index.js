const express = require('express');
const handlebars = require('express-handlebars');
const fs = require('fs');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: true}));

const messages = [];

app.get('/', (request, response) => {
    response.render('home', {messages: messages});
});

app.post('/next', (request, response) => {

    messages.push({
        author: request.body.author,
        text: request.body.text,
        date: new Date()  //.toString() ?
    });

    console.log('Array data:\n', messages);

    /**
     * parsedData from JSON file not available after redirect '/'
     * Cannot be used for rendering messages on app.get('/')
     */
    fs.writeFileSync('savedData.json', JSON.stringify(messages), {encoding: 'utf8'});
    let getData = fs.readFileSync('savedData.json', {encoding: 'utf8'});
    let parsedData = JSON.parse(getData);
    console.log('JSON file data:\n', parsedData);

    response.redirect('/');
});


app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
