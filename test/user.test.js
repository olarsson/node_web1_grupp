const should = require('chai').should();
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const randomstring = require('randomstring');

describe('Users', () => {
    //create "unique" username as to not conflict with existing username 
    const username = randomstring.generate();

    // Remove User that gets created during testing
    after(() => {
        User.remove({ 'username': username }, error => {
            if (error) console.log(error)
        });
    });

    it('should create user and reroute to /', done => {
        api.post('/user/')
            .type('form')
            .send({
                username: username,
                password: '12345',
                firstname: 'Testy',
                lastname: 'Test'
            })
            .expect(302)
            .end((err, res) => {
                if (err) console.log(err)
                else {
                    res.header.location.should.equal('/');
                    done();
                }
            })
    });

    it('should return the requested user', done => {
        api.get(`/user/${username}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    res.body.should.have.property('_id');
                    res.body._id.should.not.equal(null);
                    done();
                }
            });
    });

    it('should login a user and reroute to /', done => {
        api.post('/user/login')
            .type('form')
            .send({
                'username': username,
                'password': '12345'
            })
            .expect(302)
            .end((err, res) => {
                res.header.location.should.equal('/');
                done();
            });
    });

    it('should not login if username does not exist', done => {
        api.post('/user/login')
            .type('form')
            .send({
                'username': randomstring.generate(),
                'password': '12345'
            })
            .end((err, res) => {
                res.body.should.have.property('message');
                res.body.message.should.equal('username or password where incorrect');
                done();
            });
    });

    it('should not login if password is incorrect', done => {
        api.post('/user/login')
            .type('form')
            .send({
                'username': username,
                'password': 'WrongPassword'
            })
            .end((err, res) => {
                res.body.should.have.property('message');
                res.body.message.should.equal('username or password where incorrect');
                done();
            });
    });

    it('should logout a user and reroute to /', done => {
        api.get('/user/logout')
            .expect(302)
            .end((err, res) => {
                if (err) console.log(err)
                else {
                    res.header.location.should.equal('/');
                    done();
                }
            });
    });
});