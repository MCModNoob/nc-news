/* For my own information only... 
some types are outdated as TEXT, but not needed to change cuz its jsut for my own reference

\c nc_news
--4 table need create : topics, users, articles, and comments
DROP TABLE IF EXISTS topics;--
CREATE TABLE topics ( --
    slug SERIAL PRIMARY KEY,
    descriptions TEXT,
    img_url TEXT
);

DROP TABLE IF EXISTS users;--
CREATE TABLE users (--
    username SERIAL PRIMARY KEY,
    names VARCHAR(100),
    avatar_url varchar
);

DROP TABLE IF EXISTS articles; --
CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    topic char REFERENCES topics(slug),
    author varchar REFERENCES users(username),
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url TEXT
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(article_id),
    body TEXT,
    votes INT DEFAULT 0,
    author INT REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/