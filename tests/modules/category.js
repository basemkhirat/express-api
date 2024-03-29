import { server, token } from '../index';
import faker from 'faker';

let category = {
    name: faker.company.companyName()
};

describe("Category", function () {

    it("create a new category", function (done) {

        server.post("/api/category")
            .set('Authorization', 'Bearer ' + token)
            .send(category)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                category.id = response.body.data;
                done();
            });
    });

    it("find category by id", function (done) {
        server.get("/api/category/" + category.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                category.slug = response.body.data.slug;
                done();
            });
    });

    it("find category by slug", function (done) {
        server.get("/api/category/slug/" + category.slug)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update category by id", function (done) {
        server.put("/api/category/" + category.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("list all categories", function (done) {
        server.get('/api/category')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete category by id", function (done) {
        server.delete("/api/category/" + category.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("perform bulk delete operations", function (done) {

        let category = {
            name: faker.company.companyName()
        };

        server.post("/api/category")
            .set('Authorization', 'Bearer ' + token)
            .send(category)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);

                category.id = response.body.data;

                server.patch("/api/category")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "delete",
                        ids: [category.id]
                    })
                    .expect(200, done);
            });
    });
});
