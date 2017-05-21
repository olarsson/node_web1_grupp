const should = require('chai').should();
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

describe('Users', () => {
    let testUser;
    before((done) => {
        let user = new User({
            'username': 'Test',
            'password': '12345',
            'firstname': 'Testy',
            'lastname': 'Test'
        });
        testUser = user;
        user.save(err => { 
            if (err) console.log(err) 
            else done()
        });
    });
    after(() => {
        User.remove({ '_id': testUser._id }, error => {
            if (error) console.log(error)
        });
    });
    it('should return the requested user', done => {
        api.get(`/user/${testUser._id}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    res.body.should.have.property('username');
                    res.body.username.should.not.equal(null);
                    done();
                }
            });
    });
});

