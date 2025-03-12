const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const endpointsJson = require("../endpoints.json");

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
      });
  });
});
//git checkout test