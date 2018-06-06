var cheerio = require('cheerio');
var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiCheerio = require('chai-cheerio');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiCheerio);

describe('Api', () => {

  describe('/GET home', () => {
    it('it should GET the homepage', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        var $ = cheerio.load(res.text);
        $("#app").should.exist;
        $("main").should.have.class('home');
        $("nav.navigation").should.exist;
        done();
      });
    });
  });

  describe('/GET github-feed', () => {
    it('it should GET the github-feed', (done) => {
      chai.request(server)
      .get('/github-feed')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(10);
        done();
      });
    });
  });

  describe('/GET sitemap', () => {
    it('it should GET the sitemap', (done) => {
      chai.request(server)
      .get('/sitemap.html')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        var $ = cheerio.load(res.text);
        $("#app").should.exist;
        $("#sitemap").should.exist;
        $("#sitemap").should.have.descendants("li");
        done();
      });
    });
  });

});