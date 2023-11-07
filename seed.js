require('dotenv').config();
const mongo_uri = process.env.MONGO_URI;
const mongoose = require('mongoose')
const Character = require("./character.model")



mongoose.connect(mongo_uri)
    .then(() => console.log("connected to mongo"))
    .catch((error) => console.log(error));

fetch("https://rickandmortyapi.com/api/character")
    .then((data) => data.json())
    .then((jsonData) => {
        //we need to "clean" de data
        const cleanedArray = [];
        //the array of characters is in jsonData.results
        jsonData.results.forEach(element => {
            //console.log(element.name)
            //console.log(element.image)
            const name = element.name;
            const imageUrl = element.image;
            cleanedArray.push({ name, imageUrl })
            //console.log(cleanedArray)
        });
        return cleanedArray;
    })
    .then((cleanedArray) => {
        //console.log(cleanedArray);
        //now connect to the DB
        return Character.insertMany(cleanedArray)
    })
    .then(() => console.log("data inserted"))
    .catch((error) => console.log(error))