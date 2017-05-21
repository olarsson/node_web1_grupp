const should = require('chai').should();
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

describe('Users', () => {
    let testUser;
    /*    before((done) => {
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
        });*/
    after(() => {
        User.remove({ 'username': 'Test' }, error => {
            if (error) console.log(error)
        });
    });
    it('should create user and reroute to /', done => {
        api.post('/user/')
            .type('form')
            .send({
                username: 'Test',
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
        api.get('/user/Test')
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
});