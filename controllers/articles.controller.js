const { request, response } = require("../app");
const {
    fetchArticleById,
    fetchArticle
} = require("../models/articles.model")
 

const getArticlesById = (request, response, next) => {
    const  {article_id}  = request.params 
    fetchArticleById(article_id)
    .then((rowsArr) => {
        response.status(200).send({ thisIdArticle : rowsArr[0] });
    })
    .catch(next);
}

const getAllArticles = (request,response, next)=>{
    fetchArticle()
    .then((rowsArr)=>{
        if (!rowsArr.length) {
            return response.status(404).send({ msg: "Not a single article is found" });
        }
        response.status(200).send({ allArticle : rowsArr });
    })
    .catch(next)
}

module.exports = {getArticlesById,
    getAllArticles
}