import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import faker from 'faker';

import app from '../../src/index';
import registrationData from './user.json';
import loginData from './user.json';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('registartion', () => {
    it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
      const registerfaker = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      };
         request(app)
        .post('/api/v1/users/register')
        .send(registerfaker)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
    it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
      const registartionDetails = registrationData.user.registrationWithImproperDetails;
         request(app)
        .post('/api/v1/users/register')
        .send(registartionDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
    it('givenRegistrationDetails_whenImpProper_Validation_shouldNotSaveInDB', (done) => {
      const registartionDetails = registrationData.user.registrationWithImproperValidation;
         request(app)
        .post('/api/v1/users/register')
        .send(registartionDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
    it('givenRegistrationDetails_withOut_email_shouldNotSaveInDB', (done) => {
      const registartionDetails = registrationData.user.registrationWithOutEmail;
         request(app)
        .post('/api/v1/users/register')
        .send(registartionDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
    it('givenRegistrationDetails_withOut_firstName_shouldNotSaveInDB', (done) => {
      const registartionDetails = registrationData.user.registrationWithOutfirstName;      
         request(app)
        .post('/api/v1/users/register')
        .send(registartionDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
  
  describe('login', () => {
    it('givenLoginDetails_whenImProper_shouldNotAbleToLogin', (done) => {
      const loginDetails = loginData.user.loginWithImproperDetails;
      
         request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
    it('givenLoginDetails_whenImProper_shouldNotAbleToLogin', (done) => {
      const loginDetails = loginData.user.loginWithImproperPassword;
      
         request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
    // it('givenLoginDetails_whenProper_shouldAbleToLogin', (done) => {
    //   const loginDetails = loginData.user.login;
      
    //      request(app)
    //     .post('/api/v1/users/login')
    //     .send(loginDetails)
    //     .end((err, res) => {
    //       expect(res.statusCode).to.be.equal(200);
    //       done();
    //     });
    // });
  });

  describe('GET /users', () => {
    it('should return empty array', (done) => {
      request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });
});
