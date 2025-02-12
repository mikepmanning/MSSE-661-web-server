// tests/tasks.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';

const { expect } = chai; // Destructure for cleaner access
chai.use(chaiHttp);

// Assuming your server is running on localhost:3001
// It's best to get this from a config file or environment variable in a real project.
const server = 'http://localhost:3001';

describe('Tasks API Service', function () {
  it('should GET all tasks', async () => { // Use async/await
    const res = await chai.request(server).get('/api/tasks');

    expect(res.status).to.be.eql(200);
    expect(res.body).to.be.an('array'); // 'an' is more readable than 'a'
    expect(res.body).to.have.lengthOf.at.least(1); // More expressive way to check length
  });

  it('should GET a single task', async () => { //Commented out test made active
    const expected = [
          {
            name: "I'm the first task!", //Make sure your data is accurate to what is being returned
            status: "completed",
          },
        ];

        const res = await chai.request(server).get('/api/tasks/1'); // You need a valid task ID here

        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.an('object'); //Changed to expect an object if single task is returned
        expect(res.body).to.deep.equal(expected[0]); //Compare to the first object in the array that you made
  });

  it('should Post a single task', async () => { //Commented out test made active
        const newTask = {
            name: "New test task!",
        };

        const expected = {message: 'Add task successfully'}; //Make sure this is correct to what your server sends

        const res = await chai.request(server).post('/api/tasks').send(newTask);

        expect(res.status).to.be.eql(200);  // Or 201 for Created, depending on your API
        expect(res.body).to.be.eql(expected);
    });
});