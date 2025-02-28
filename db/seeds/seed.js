const db = require("../connection");
const { createLookupObject } = require("./utils");


const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query("DROP TABLE IF EXISTS comments;")
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
      return createtopics();
    })
    .then(() => {
      return createusers();
    })
    .then(() => {
      return createarticles();
    })
    .then(() => {
      return createcomments();
    })
    // .then(() => {
    //   return insertcomments(commentData);
    // });


};

function createtopics() {
  /* Create your topics table in the query below */
  return db.query(
    "CREATE TABLE topics (slug VARCHAR(255) PRIMARY KEY, description VARCHAR(255), img_url VARCHAR(1000));"
  );
}

function createusers() {
  /* Create your users table in the query below */
  return db.query(
    "CREATE TABLE users (username VARCHAR(100) PRIMARY KEY, name VARCHAR(100), avatar_url VARCHAR(1000));"
  );
}

function createarticles() {
  /* Create your articles table in the query below */
  return db.query(
    "CREATE TABLE articles (article_id SERIAL PRIMARY KEY, title VARCHAR(200), topic VARCHAR(255) REFERENCES topics(slug), author VARCHAR(100) REFERENCES users(username), body TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, votes INT DEFAULT 0, article_img_url VARCHAR(1000));"
  );
}

function createcomments() {
  /* Create your comments table in the query below */
  return db.query(
    "CREATE TABLE comments (comment_id SERIAL PRIMARY KEY, article_id INT REFERENCES articles(article_id), body TEXT, votes INT DEFAULT 0, author VARCHAR(255) REFERENCES users(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
  );
}

// [ {Data object} ] <<<< data-file structure

function insertcomments(commentData) {
  const lookupObject = createLookupObject();
  const formattedData = commentData.map((commentObj) => {
    const commentValues = Object.values(commentObj);
    return commentValues;
  });
  const sql = format(
    "INSERT INTO comments (article_title, body, votes, author) VALUES %L RETURNING *;",
    formattedData
  );
  return db.query(sql);
}
module.exports = seed;
