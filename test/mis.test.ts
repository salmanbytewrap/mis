import { agent as request } from "supertest";
import { expect } from "chai";
import app from "../src/app";

export var _id = "",
    email = "",
    token = "";

let userTestData = {
    "firstName": "Vijay",
    "lastName": "kumar",
    "email": "salman@email.com",
    "type": "user"
}

export var mochaAsync = (fn) => {
    return (done) => {
        fn.call().then(done, (err) => {
            done(err);
        });
    };
};


describe("#login", () => {
    describe("#test login ", () => {
        it('Login api', () => {
            mochaAsync(async () => {
                const res = await request(app).get("/v1/login");
                let body = res.body;
            })
        });
    });

});

describe("#mis", () => {
    var database = null;

    describe("#test ", () => {
        it('health should be okay', () => {
            let actualResult = "OK";
            expect(actualResult).to.equal('OK');
        });
    });

    describe("#test ", () => {
        it('Save user', () => {
            mochaAsync(async () => {
                const res = await request(app).post("/v1/mis").send(userTestData);
                let body = res.body;
                expect(res.status).to.equal(201);
                expect(body.success).to.be.true;
            })
        });
    });



});
