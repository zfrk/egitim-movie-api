const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token;
let movieId;

describe('/api/movie test', () => {
  before((done) => {
    chai
      .request(server)
      .post('/authenticate')
      .send({ username: 'Zafer1', password: '1234567' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.status.should.equal(true);
        token = res.body.token;
        done();
      });
  });

  describe('GET Movies', () => {
    it('it should get all movies', (done) => {
      chai
        .request(server)
        .get('/api/movies')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('POST Movei', () => {
    it('it should post a movie', (done) => {
      const movie = {
        title: 'Test',
        directory_id: '5f734c2716e2826b032624a2',
        category: 'Test',
        country: 'Almanya',
        year: 1950,
        imdb_score: 7,
      };
      chai
        .request(server)
        .post('/api/movies')
        .set('x-access-token', token)
        .send(movie)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('directory_id');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          res.body.should.have.property('imdb_score');
          movieId = res.body._id;
          done();
        });
    });
  });

  describe('/GET/:movie_id movie', () => {
    it('it should get a movie by the given id', (done) => {
      chai
        .request(server)
        .get(`/api/movies/${movieId}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('directory_id');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          res.body.should.have.property('imdb_score');
          res.body.should.have.property('_id').eql(movieId);
          done();
        });
    });
  });

  describe('/PUT/:movie_id Movie', () => {
    it('it should update a movie by id', (done) => {
      const movie = {
        title: 'Test_Update',
        directory_id: '5f734c2716e2826b032624a2',
        category: 'Test_Update',
        country: 'Türkiye',
        year: 1955,
        imdb_score: 11,
      };

      chai
        .request(server)
        .put(`/api/movies/${movieId}`)
        .send(movie)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql(movie.title);
          res.body.should.have.property('directory_id').eql(movie.directory_id);
          res.body.should.have.property('category').eql(movie.category);
          res.body.should.have.property('country').eql(movie.country);
          res.body.should.have.property('year').eql(movie.year);
          res.body.should.have.property('imdb_score').eql(movie.imdb_score);
          res.body.should.have.property('_id').eql(movieId);

          done();
        });
    });
  });

  describe('/DELETE/:movie_id Movie', () => {
    it('it should delete a movie by id', (done) => {
      chai
        .request(server)
        .delete(`/api/movies/${movieId}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id').eql(movieId);

          done();
        });
    });
  });
});
