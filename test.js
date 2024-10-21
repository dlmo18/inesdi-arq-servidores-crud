const request = require('supertest');
const app = require('./app');

const newPost = {
    "title": "Publicación",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "author": "David Molina"
};

let Post_1=null;
let Post_2=null;

describe("POST /api/posts", () => {
    it("Debe registrar un 1er Post nuevo", async () => {

        let postObj=newPost;
        postObj.title = postObj.title + Math.random();

        return request(app)
            .post("/api/posts")
            .send(postObj)
            .expect('Content-Type', /json/)
            .expect(201)
            .then((res) => {
                expect(res._body).toHaveProperty('id');  
                expect(res._body.title).toBe(postObj.title); 
            })
    });

    it("Debe registrar un 2do Post nuevo", async () => {

        let postObj=newPost;
        postObj.title = postObj.title + Math.random();

        return request(app)
            .post("/api/posts")
            .send(postObj)
            .expect('Content-Type', /json/)
            .expect(201)
            .then((res) => {
                expect(res._body).toHaveProperty('id');  
                expect(res._body.title).toBe(postObj.title);  
            })
    });
});

describe("GET /api/posts", () => {
    it("Debe listar todos los posts nuevos", async () => {

        let postObj=newPost;
        postObj.title = postObj.title + Math.random();

        return request(app)
            .get("/api/posts")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res._body).toHaveLength(2); 
            })
    });
});
                                
describe("PATCH /api/posts", () => {
    let postObj=newPost;
    postObj.title = postObj.title + Math.random();

    it("Debe actualizar el Post", async () => {

        return request(app)
            .post("/api/posts")
            .send(postObj)
            .expect('Content-Type', /json/)
            .expect(201)
            .then((res) => {
                expect(res._body).toHaveProperty('id');  
                expect(res._body.title).toBe(postObj.title); 
                Post_1 = res._body.id;  

                return request(app)
                    .patch(`/api/posts/${Post_1}`)
                    .send(postObj)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((res) => {
                        expect(res._body.message).toContain("actualizado correctamente");              
                    
                        return request(app)
                            .get(`/api/posts/${Post_1}`)
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .then((res) => {
                                expect(res._body.title).toBe(postObj.title);              
                            })
                    })
            })
    });

});       


describe("DELETE /api/posts", () => {
    let postObj=newPost;
    postObj.title = postObj.title + Math.random();

    it("Debe eliminar el Post", async () => {

        return request(app)
            .post("/api/posts")
            .send(postObj)
            .expect('Content-Type', /json/)
            .expect(201)
            .then((res) => {
                expect(res._body).toHaveProperty('id');  
                expect(res._body.title).toBe(postObj.title); 
                Post_1 = res._body.id;  

                return request(app)
                    .delete(`/api/posts/${Post_1}`)
                    .expect(204)
                    .then((res) => {
                        
                        return request(app)
                            .get(`/api/posts/${Post_1}`)
                            .expect('Content-Type', /json/)
                            .expect(404)
                    })
            })
    });

});