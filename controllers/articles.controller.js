const {
    fetchArticleById
} = require("../models/articles.model")
 

const getArticlesById = (request, response, next) => {
    const  {article_id}  = request.params 
    fetchArticleById(article_id)
    .then((rowsArr) => {
        console.log(">>>>rows :", rowsArr)
        if (!rowsArr.length) {
            return response.status(404).send({ msg: "Article not found" });
        }
        response.status(200).send({ thisIdArticle : rowsArr[0] });
    })
    .catch(next);
}

module.exports = {getArticlesById}