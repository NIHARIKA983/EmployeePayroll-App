import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import faker from 'faker';

import app from '../../src/index';
import registrationData from './user.json';
import loginData from './user.json';
import employeeDB from './user.json';

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

  describe('create employee api', () => {
    it('employee', (done) => {
      const token = employeeDB.user.employee.validToken;
      const createNotes = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.gender(),
        salary: faker.internet.port(),
        department: faker.name.jobType(),
        emailId: faker.internet.email()
      };
      console.log(createNotes);
        request(app)
        .post('/api/v1/users/employees')
        .set({ authorization: token })
        .send(createNotes)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });

    it('givenCreateEmployeeDetails_whenInvalidToken_shouldNotbeCreated', (done) => {
      const token = employeeDB.user.employee.invalidToken;
      const createNotes = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.gender(),
        salary: faker.internet.port(),
        department: faker.name.jobType(),
        emailId: faker.internet.email()
      };
      console.log(createNotes);
      
         request(app)
        .post('/api/v1/users/employees')
        .set({ authorization: token })
        .send(createNotes)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });


  // get employee test cases
describe('get employee api', () => {
  it('employee', (done) => {
    const token = employeeDB.user.employee.validToken;
    
       request(app)
      .get('/api/v1/users/getEmployees')
      .set({ authorization: token })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

  it('givenCreateEmployeeDetails_whenInvalidToken_shouldNotbeGet', (done) => {
    const token = employeeDB.user.employee.invalidToken;
    
       request(app)
      .get('/api/v1/users/getEmployees')
      .set({ authorization: token })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});
   

  // get data by id
describe('Get Employee by ID api', () => {
  it('givenPoperDetails_ShouldGetEmployee', (done) => {
    const token = employeeDB.user.employee.validToken;
    
       request(app)
      .get('/api/v1/users/getEmployee/61de82d3e8465d1b1c5c8250')
      .set({ authorization: token })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

  it('givenInvalidToken_ShouldNotGetEmployee', (done) => {
    const token = employeeDB.user.employee.invalidToken;
    
       request(app)
      .get('/api/v1/users/getEmployee/61de82d3e8465d1b1c5c8250')
      .set({ authorization: token })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

 // update employee test cases
 describe('Update employee api', () => {
  it('givenPoperDetails_ShouldUpdateEmployee', (done) => {
    const token = employeeDB.user.employee.validToken;
    const note = employeeDB.user.updateEmployee.validData;
      request(app)
      .put('/api/v1/users/updateEmployee/61df968a3731e42d20b649da')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(202);
        done();
      });
  });

  it('givenInvalidToken_ShouldNotUpdateEmployee', (done) => {
    const token = employeeDB.user.employee.invalidToken;
    const note = employeeDB.user.updateEmployee.validData;
    
      request(app)
      .put('/api/v1/users/updateEmployee/61df968a3731e42d20b649da')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
 });


 // delete note test cases
 describe('delete notes api', () => {
  it('givenImPoperDetails_ShouldNotDeleteNote', (done) => {
    const token = employeeDB.user.employee.validToken;
    
      request(app)
      .delete('/api/v1/users/deleteEmployee/61653c4e458259447e4e225f')
      .set({ authorization: token })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

  it('givenInvalidToken_ShouldNotDeleteNote', (done) => {
    const token = employeeDB.user.employee.invalidToken;
    
      request(app)
      .delete('/api/v1/users/deleteEmployee/61653c4e458259447e4e225f')
      .set({ authorization: token })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
 });


  // describe('GET /users', () => {
  //   it('should return empty array', (done) => {
  //     request(app)
  //       .get('/api/v1/users')
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(200);
  //         expect(res.body.data).to.be.an('array');

  //         done();
  //       });
  //   });
  // });
});
