const { request, response } = require("../app");
const { createLookupObject } = require("../db/seeds/utils");
const {
  fetchArticleById,
  fetchArticle,
  fetchcommentsByArticleId,
} = require("../models/articles.model");

const getArticlesById = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then((rowsArr) => {
      response.status(200).send({ thisIdArticle: rowsArr[0] });
    })
    .catch(next);
};

const getAllArticles = (request, response, next) => {
  fetchArticle()
    .then((rowsArr) => {
      response.status(200).send({ allArticle: rowsArr });
    })
    .catch(next);
};

const getCommentsByArticleId = (request, response, next) => {
  const { id } = request.params;
  console.log("id >>>> : ", id);
  fetchcommentsByArticleId(id)
    .then((commentsArr) => {
      response.status(200).send({ comments: commentsArr });
    })
    .catch(next);
};

module.exports = {
  getArticlesById,
  getAllArticles,
  getCommentsByArticleId,
};

