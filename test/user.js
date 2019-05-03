import { server, token } from './index';
import faker from 'faker';

let user = {
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    password: faker.internet.password()
};

describe("User", function () {

    it("create a new user", function (done) {
        server.post("/api/user")
            .set('Authorization', 'Bearer ' + token)
            .send(user)
            .expect(200)
            .end(function (error, response) {
                if(error) throw error;
                user.id = response.body.data;
                done();
            });
    });

    it("find user by id", function (done) {
        server.get("/api/user/" + user.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update user by id", function (done) {
        server.put("/api/user/" + user.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                email: faker.internet.email(),
                first_name: faker.name.firstName(),
                password: faker.internet.password()
            })
            .expect(200, done);
    });


    it("list all users", function (done) {
        server.get('/api/user')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete user by id", function (done) {
        server.delete("/api/user/" + user.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });
});
