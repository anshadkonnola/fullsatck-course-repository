const mongoose = require('mongoose');

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2] //firfox saved one
  const name = process.argv[3]
  const number = process.argv[4]

  const url =
    `mongodb+srv://anshad:${password}@cluster0.rvwu6kn.mongodb.net/phonebookApp?retryWrites=true&w=majority`
  
  mongoose.set('strictQuery',false)
  mongoose.connect(url)
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  const entry = new Person({
    name: name,
    number: number,
  })

  if(name == undefined && number == undefined){
    Person.find({}).then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(person.name+' '+person.number)
      })
      mongoose.connection.close()
    })
  } else {
    entry.save().then(result => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
  }

  
  
