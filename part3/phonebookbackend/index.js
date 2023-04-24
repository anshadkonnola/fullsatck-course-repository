require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));
app.use(express.json());
app.use(express.static('build'));

morgan.token('content', (request) =>
  request.method === 'POST' && request.body.name
    ? JSON.stringify(request.body)
    : null
)

app.get('/', (request, response) => {
    response.sendFile('./build/index.html');
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    })
});

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person);
    })
});

app.get('/info', (request, response) => {
    Person.find({}).then(phonebook => {
        const date = new Date();
        const info = `Phonebook has info for ${phonebook.length} people<br><br>${date}`;
        response.send(info);
    })
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    phonebook = phonebook.filter(person => person.id !== id);
    console.log('deleted');

    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson);
        })
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});