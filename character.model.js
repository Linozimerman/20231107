const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const characterSchema = new Schema( 
{ 
    name: { type: String }, 
    imageUrl: { type: String } 
}); 

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;