const { request, response } = require("../app");
const {
    fetchAllTopics,
} = require("../models/topics.model")
 

const getAllTopics=(request,response)=>{
    console.log("any string");
    fetchAllTopics()
    .then( (rows) =>{
        console.log(rows)
        response.status(200).send({ allTopics: rows });
    })
}

module.exports = {getAllTopics}