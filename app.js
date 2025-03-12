const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.json");
const {getAllTopics}=require("./controllers/topics.controller");
const {getArticlesById, getAllArticles}=require("./controllers/articles.controller");
const handleNotExistEndpoint = require("./controllers/error.controller");
const { errorMonitor } = require("supertest/lib/test");

app.use(express.json());

app.get("/api", (req, res) => {  
    res.status(200).send({ endpoints: endpointsJson });
});

app.get("/api/topics",getAllTopics)

app.get("/api/articles/:article_id",getArticlesById)

app.get("/api/articles", getAllArticles)

app.all('/*', handleNotExistEndpoint)

app.use( ( err, request, response, next )=>{
    console.log("error app.js")
    response.status(500).send({msg: "Internal server error"})
})

module.exports = app;