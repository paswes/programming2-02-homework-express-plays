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
        text: request.body.text,       // let messages, push only in JSON file and render JSON file, ASYNC
        date: new Date().toString()
    });


    fs.writeFile('testData.json', JSON.stringify(messages), 'utf8', (err) => {
        if (err) {
            return console.log(err);
        }

        console.log("Wrote JSON file successfully.");
    });

    /*
    let jsonData = fs.readFile('testData.json', 'utf8', (err) => {
        if (err) {
            return console.log(err);
        }
        let parsedData;
        parsedData = JSON.parse(jsonData);
        console.log(parsedData);
    });
    */

    console.log(messages);
    response.redirect('/');
});


app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
