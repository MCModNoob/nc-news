const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const endpointsJson = require("../endpoints.json");
const { convertTimestampToDate } = require("../db/seeds/utils");

/* Set up your test imports here */
const request = require("supertest");
const app = require("../app");

/* Set up your beforeEach & afterAll functions here */

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        // console.log(endpoints,"endpoints")
        // console.log(endpointsJson,"endpoints Json")
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an object of all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.allTopics.length).toBe(3);
        body.allTopics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.img_url).toBe("string");
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an object of the correct article by id", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        console.log(" body >>>> : ", body);
        expect(body.thisIdArticle).toHaveProperty("article_id", 2);
        const thisIdArticle = body.thisIdArticle;
        console.log("body object in loop");
        expect(typeof thisIdArticle.article_id).toBe("number");
        expect(thisIdArticle.article_id).toBe(2);
        expect(thisIdArticle.title).toBe("Sony Vaio; or, The Laptop");
        expect(thisIdArticle.topic).toBe("mitch");
        expect(thisIdArticle.author).toBe("icellusedkars");
        expect(thisIdArticle.body).toBe(
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me."
        );
        expect(thisIdArticle.created_at).toBe("2020-10-16T05:03:00.000Z");
        expect(thisIdArticle.votes).toBe(0);
        expect(thisIdArticle.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an object of the all article in date decending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body :{allArticle} }) => {
        console.log(" allArticle >>>> ", allArticle);
          allArticle.forEach((article) => {
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.title).toBe("string");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.author).toBe("string");
            expect(typeof article.body).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
        });
      });
  });
  test("200 : respond objects with dates in decending order",()=>{
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body :{allArticle} }) => {
        console.log(" allArticle >>>> ", allArticle);
          for (let i = 0; i < allArticle.length - 1; i++) {
            const date1 = convertTimestampToDate({ created_at: allArticle[i].created_at }).created_at.getTime();
            const date2 = convertTimestampToDate({ created_at: allArticle[i+1].created_at }).created_at.getTime();
            expect(date1).toBeGreaterThanOrEqual(date2);
          }
      });
  })
});
