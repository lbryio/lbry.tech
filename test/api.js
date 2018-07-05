"use strict"; /* global describe, it */



//  P A C K A G E S

const cheerio = require("cheerio");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiCheerio = require("chai-cheerio");

//  V A R I A B L E

const server = require("../server");
const should = chai.should(); // eslint-disable-line



//  P R O G R A M

chai.use(chaiHttp);
chai.use(chaiCheerio);



describe("API", () => {
  describe("/GET home", () => {
    it("it should GET the homepage", done => {
      chai.request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;

          const $ = cheerio.load(res.text);
          $("#app").should.exist;
          $("main").should.have.class("home");
          $("nav.navigation").should.exist;

          done();
        });
    });
  });

  describe("/GET github-feed", () => {
    it("it should GET the github-feed", done => {
      chai.request(server)
        .get("/github-feed")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(10);

          done();
        });
    });
  });

  describe("/GET sitemap", () => {
    it("it should GET the sitemap", done => {
      chai.request(server)
        .get("/sitemap.html")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;

          const $ = cheerio.load(res.text);
          $("#app").should.exist;
          $("#sitemap").should.exist;
          $("#sitemap").should.have.descendants("li");

          done();
        });
    });
  });
});
