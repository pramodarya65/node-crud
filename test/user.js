let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/server");
let User = require("../src/models/User");
let should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /Get route
 */
describe("User API", () => {
  describe("Get the users", () => {
    it("it should get all the users", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("error").eql(false);
          done();
        });
    });
    it("it should not get all the users", (done) => {
      chai
        .request(server)
        .get("/api/user")
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });
});

/*
 * Test the /Post route
 */
describe("User API", () => {
  describe("Post the users", () => {
    it("it should create an user ", (done) => {
      let user = {
        first_name: "Test",
        last_name: "User",
        email: "test@test.com",
        phone_number: "9090876543",
        date_of_birth: "01-12-1991",
        gender: "Male",
      };
      chai
        .request(server)
        .post("/api/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("error").eql(false);
          res.body.data.should.have.property("first_name");
          res.body.data.should.have.property("last_name");
          res.body.data.should.have.property("email");
          res.body.data.should.have.property("phone_number");
          res.body.data.should.have.property("date_of_birth");
          res.body.data.should.have.property("gender");
          done();
        });
    });
  });
});

/*
 * Test the /Update route
 */
describe("User API", () => {
  describe("/PUT/:id user", () => {
    it("it should UPDATE a user given the id", (done) => {
      let user = new User({
        first_name: "Update",
        last_name: "User",
        email: "update@test.com",
        phone_number: "1234567899",
        date_of_birth: "01-12-1991",
        gender: "Male",
      });
      user.save((err, user) => {
        chai
          .request(server)
          .put("/api/users/" + user.id)
          .send({
            first_name: "Update-1",
            last_name: "User-1",
            email: "update-1@test.com",
            phone_number: "1234567899",
            date_of_birth: "01-12-1991",
            gender: "Male",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.data.should.have.property("first_name").eql("Update-1");

            done();
          });
      });
    });
  });
});

/*
 * Test the /Delete route
 */
describe("User API", () => {
  describe("/Delete/:id user", () => {
    it("it should DELETE a user given the id", (done) => {
      let user = new User({
        first_name: "Delete",
        last_name: "User",
        email: "delete@test.com",
        phone_number: "1234567899",
        date_of_birth: "01-12-1991",
        gender: "Male",
      });
      user.save((err, user) => {
        chai
          .request(server)
          .delete("/api/users/" + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("error").eql(false);

            done();
          });
      });
    });
  });
});

/*
 * Test the /Search route
 */
describe("User API", () => {
  describe("Search the users", () => {
    it("it should get all the searched users", (done) => {
      chai
        .request(server)
        .get("/api/users/search/Test")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("error").eql(false);
          done();
        });
    });
  });
});
