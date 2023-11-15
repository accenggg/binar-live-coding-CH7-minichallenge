const request = require("supertest");
const app = require("../app");
// const baseURL = "http://localhost:8000"
const dotenv = require("dotenv");
dotenv.config();

// describe("Dog", () => {
//     it("should have name called 'Arnold'", () => {
//         const dog = new Dog("Arnold");

//         expect(dog).toHaveProperty("name", "Arnold");
//     });

//     it("should be able to bark and return 'Woof!'", () => {
//         const dog = new Dog("Arnold");
//         expect(dog.bark()).toEqual("Woof!");
//     });
// });

// describe("API get all cars", () => {
//     it("success get all data cars", (done) => {
//         request(app)
//             .get("/v1/cars")
//             .expect(200, done);
//     });
// });

describe("API get all cars", () => {
  it("success get all data cars", async () => {
    const response = await request(app).get("/v1/cars");
    expect(response.statusCode).toBe(200);
  });
});

describe("API get car By ID", () => {
  it("success get data car", async () => {
    const response = await request(app).get("/v1/cars/20");
    expect(response.statusCode).toBe(200);
  });
});

describe("API create car", () => {
  const carData = {
    name: "Suzuki",
    price: 300000,
    size: "SMALL",
    image: `https://https://unsplash.com/photos/a-group-of-antelope-standing-in-the-desert-i60yUhfWeYI`,
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IkpvaG5ueSIsImVtYWlsIjoiam9obm55QGJpbmFyLmNvLmlkIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2OTk4ODU1NDF9.ZMTs6GtxtXjixTa-s-ok2JQg--HwD4k6W_gfNHYqQUQ";

  it("success create data car", async () => {
    const response = await request(app)
      .post("/v1/cars/")
      .send(carData)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(201);
  });

  it("failed create data car without token", async () => {
    const response = await request(app).post("/v1/cars/").send(carData);
    expect(response.statusCode).toBe(401);
  });
});

describe("API rent car By ID", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkZpa3JpIiwiZW1haWwiOiJmaWtyaUBiaW5hci5jby5pZCIsImltYWdlIjpudWxsLCJyb2xlIjp7ImlkIjoxLCJuYW1lIjoiQ1VTVE9NRVIifSwiaWF0IjoxNzAwMDIyODcxfQ.3rKv8AoAI7j_yfTFjz3GlofhchJbthIci5J3HtVDOMQ";

  const rentStartedAt = new Date();

  it("success rent car", async () => {
    const response = await request(app)
      .post("/v1/cars/1/rent")
      .send({
        rentStartedAt,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(201);
  });

  // it("car is currently rent", async () => {
  //   const response = await request(app)
  //     .post("/v1/cars/2/rent")
  //     .send({
  //       rentStartedAt,
  //     })
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(response.statusCode).toBe(422);
  // });
});

describe("API update car", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG5ueSIsImVtYWlsIjoiam9obm55QGJpbmFyLmNvLmlkIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE3MDAwMzQwNjF9.gWbb25WUBtuzrtNpImjmLNQGzukQIMA1spK1EM5ipks";

  it("success update car", async () => {
    const response = await request(app)
      .put("/v1/cars/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Suzuki",
        price: 300000,
        size: "SMALL",
        image: `https://https://unsplash.com/photos/a-group-of-antelope-standing-in-the-desert-i60yUhfWeYI`,
      });
    expect(response.statusCode).toBe(200);
  });

  // it("failed update car", async () => {
  //   const response = await request(app).put("/v1/cars/1").send({
  //     name: "Suzuki",
  //     price: 300000,
  //     size: "SMALL",
  //     image: `https://https://unsplash.com/photos/a-group-of-antelope-standing-in-the-desert-i60yUhfWeYI`,
  //   });
  //   expect(response.statusCode).toBe(422);
  // });
});

// describe("API failed create car without req.body", () => {
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IkpvaG5ueSIsImVtYWlsIjoiam9obm55QGJpbmFyLmNvLmlkIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2OTk4ODU1NDF9.ZMTs6GtxtXjixTa-s-ok2JQg--HwD4k6W_gfNHYqQUQ";
//   it("success create data car", async () => {
//     const response = await request(app)
//       .post("/v1/cars/")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(422);
//   });
// });
