const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const password = process.argv[2]
const url = process.env.MONGODB_URI
//`mongodb+srv://puhelinluettelo:${password}@cluster0-te98i.mongodb.net/person-app?retryWrites=true&w=majority`

console.log('connectiong to', url)

//mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {type:String, unique:true, minlength:3},
    number: {type:String, minlength:8}
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)