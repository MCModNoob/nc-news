const db = require("../connection");
const { createLookupObject, convertTimestampToDate } = require("./utils");
const format = require('pg-format');

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query("DROP TABLE IF EXISTS comments;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics;");
    })
    .then(() => {
      return createTopics();
    })
    .then(() => {
      return createUsers();
    })
    .then(() => {
      return createArticles();
    })
    .then(() => {
      return createComments();
    })
  .then(() => {
    return insertTopics(topicData);
  })
  .then(() => {
    return insertUsers(userData);
  })
  .then(() => {
    return insertArticles(articleData);
  })
  .then((results) => {
    return insertComments(commentData,results);
  })
};

function createTopics() {
  /* Create your topics table in the query below */
  return db.query(
    `
    CREATE TABLE topics 
    (slug VARCHAR(255) PRIMARY KEY, 
    description VARCHAR(255),
    img_url VARCHAR(1000));
    `
  );
}

function createUsers() {
  /* Create your users table in the query below */
  return db.query(
    `
    CREATE TABLE users 
    (username VARCHAR(100) PRIMARY KEY, 
    name VARCHAR(100), 
    avatar_url VARCHAR(1000));
    `
  );
}

function createArticles() {
  /* Create your articles table in the query below */
  return db.query(
    `
    CREATE TABLE articles 
    (article_id SERIAL PRIMARY KEY, 
    title VARCHAR(200) NOT NULL, 
    topic VARCHAR(255) REFERENCES topics(slug) NOT NULL,
    author VARCHAR(100) REFERENCES users(username) NOT NULL, 
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000)
    );
    `
  );
}

function createComments() {
  /* Create your comments table in the query below */
  return db.query(
    `
    CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY, 
    article_id INT REFERENCES articles(article_id) NOT NULL, 
    body TEXT NOT NULL, 
    votes INT DEFAULT 0, 
    author VARCHAR(255) REFERENCES users(username) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
  );
}

// [ {Data object} ] <<<< data-file structure

function insertTopics(topicsData) {
  const formattedTopicData= topicsData.map(topic =>{
    return [topic.slug , topic.description , topic.img_url]
  })

  const sqlQuery = format(`INSERT INTO topics
    (
    slug, 
    description,
    img_url )
    VALUES %L;`,formattedTopicData
  )
  return db.query(sqlQuery)
}

function insertUsers(userData) {
  const formattedUserData= userData.map(user=>{
    return [user.username , user.name , user.avatar_url]
  })
  const sqlQuery = format(`INSERT INTO users
    (
    username, 
    name,
    avatar_url )
    VALUES %L;`,formattedUserData
  )
  return db.query(sqlQuery)
}

function insertArticles(articleData){

    const formattedArticle = articleData.map((article) => {
        // console.log("each article in Arti Data array", ":\n ", article);
        const articleValues = [
          article.title,
          article.topic,
          article.author,
          article.body,
          convertTimestampToDate({ created_at: article.created_at }).created_at,
          article.article_img_url
        ];
        // console.log(articleValues,"<<<articles values")
        return articleValues;
    });
    //console.log(formattedRides, "<<< formattedRides");
    const sql = format(
      "INSERT INTO articles (title, topic, author, body, created_at,article_img_url) VALUES %L RETURNING *;",
      formattedArticle
    );
    return db.query(sql);
  }
  
function insertComments(commentData,results) {
  const articles = results.rows;
  const articleLookupObject = createLookupObject(articles, "title", "article_id");

  const formattedCommentData = commentData.map((comment) => {
    const commentValues = [
      articleLookupObject[comment.article_title],
      comment.body,
      comment.votes,
      comment.author,
      convertTimestampToDate({ created_at: comment.created_at }).created_at
    ];
    return commentValues;
  });

  const sql = format(
    "INSERT INTO comments (article_id, body, votes, author,  created_at) VALUES %L RETURNING *;",
    formattedCommentData
  );
  return db.query(sql);
}

module.exports = seed;
