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
    it("Returns the home page", (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it("It should POST searches to the searches page", (done) => {
        chai.request(server)
            .post("/searches")
            .end((err, response) => {
                expect(response.result_1).to.be.a("array");
                expect(response).to.have.status(200);
                done();
            });
    });
});
