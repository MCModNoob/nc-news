const db = require("../db/connection");

const fetchArticleById = (id)=>{
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows })=>{
        return rows;
    })
}

module.exports= {fetchArticleById}