const { request, response } = require("../app");
const {
    fetchAllTopics,
} = require("../models/topics.model")
 

const getAllTopics=(request,response)=>{
    fetchAllTopics()
    .then( (rows) =>{
        response.status(200).send({ allTopics: rows });
    })
}

module.exports = {getAllTopics}