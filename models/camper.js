// create camper model with mongo to do some CRUD

// mongoose
let mongoose = require('mongoose');

// json definition ( data types, properties, etc)
let camperSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: 'First Name is Required'
  },
  lastName:{
    type: String,
    required: 'Last Name is required'
  }
});

//make the model public
module.exports = mongoose.model('Camper', camperSchema);
