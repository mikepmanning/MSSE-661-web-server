import { expect, request } from './test-utils.js';

const server = 'http://localhost:3001';

describe('Tasks API Service', function () {
  it('should GET all tasks', async () => { 
    const res = await request(server).get('/api/tasks');

    expect(res.status).to.be.eql(200);
    expect(res.body).to.be.a('array');
    expect(res.body).to.have.lengthOf.at.least(1); 
  });

  it('should GET a single task', async () => {
    const expected = [
          {
            status: [
              "pending"
            ],
            _id: "67ac358296e3b043e979cb29",
            name: "First Task Test",
            created_date: "2025-02-12T05:45:38.999Z",
            __v: 0
          },
        ];

        const res = await request(server).get(`/api/tasks/${expected[0]._id}`);

        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.deep.equal(expected[0]); 
  });

  let id;
  it('should Post a single task', async () => { 
        const newTask = {
            name: "New test task!",
        };

        const res = await request(server).post('/api/tasks').send(newTask);

        expect(res.status).to.be.eql(201); 
        expect(res.body.name).to.be.eql(newTask.name);
        expect(res.body.status[0]).to.be.eql('pending');

        id = res.body._id;
    });
    
  it('should Delete a single task', async () => { 

    let res = await request(server).delete(`/api/tasks/${id}`);

    expect(res.status).to.be.eql(204);

    res = await request(server).get(`/api/tasks/${id}`);
    expect(res.status).to.be.eql(404);
  });
});