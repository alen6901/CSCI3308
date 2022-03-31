// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
    // Sample test case given to test / endpoint.
    it("Returns the default welcome message", (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                assert.strictEqual(res.body.message, "Welcome!");
                done();
            });
    });

    // ===========================================================================
    // TODO: Please add your test cases for part A here.
    it("Returns if array & size != 0", (done) => {
        chai.request(server)
            .get("/operations")
            .end((err, res) => {
                expect(res).to.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.not.be.eq(0);
                done();
            });
    });
    it("Operations", (done) => {
        const ops = 1;
        chai.request(server)
            .get("/operations/" + ops)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("name");
                res.body.should.have.property("sign");
                res.body.should.have.property("id").eq(1);
                done();
            });
    });
    it("Operations Post", (done) => {
        const op = {
            id: 4,
            name: "Divide",
            sign: "/",
        };
        chai.request(server)
            .post("/operations/")
            .send(op)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("id").eq(4);
                res.body.should.have.property("name").eq("Divide");
                res.body.should.have.property("sign").eq("/");
                done();
            });
    });
    // ===========================================================================
    // TODO: Please add your test cases for part B here.
    it("Player Post", (done) => {
        const player = {
            id: 1,
            pname: "John Doe",
            dob: "2000-02-20",
        };
        chai.request(server)
            .post("/players/add")
            .send(player)
            .end((err, res) => {
                res.should.have.status(200);
                assert.strictEqual(res.body.message, "Success!");
                done();
            });
    });
    it("Player Post2", (done) => {
        const player = {
            id: 1,
            pname: 1,
            dob: "2000-02-20",
        };
        chai.request(server)
            .post("/players/add")
            .send(player)
            .end((err, res) => {
                res.should.have.status(400);
                assert.strictEqual(res.body.message, "Invalid input");
                done();
            });
    });
    it("Player Get", (done) => {
        const playerId = 1;
        chai.request(server)
            .get("/players/" + playerId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("name");
                res.body.should.have.property("dob");
                res.body.should.have.property("id").eq(1);
                done();
            });
    });
    it("Player Get2", (done) => {
        const playerId = "l";
        chai.request(server)
            .get("/players/" + playerId)
            .end((err, res) => {
                assert.strictEqual(res.body.message, "Invalid input");
                done();
            });
    });
});
