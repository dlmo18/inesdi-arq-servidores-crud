const request = require('supertest');
const app = require('./app');

const newUser = {
    "name": "David Molina",
    "email": "dmolina."+Math.random()+"@gmail.com",
    "password": "Dmolina#2024",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
};

const newPost = {
    "title": "Publicación",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "author": "David Molina"
};

describe("POST /api/user", () => {
    
    it("Debe registrar un Usuario nuevo y aceptar el login", async () => {
        return request(app)
            .post("/api/users")
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(201)
            .then((res) => {
                expect(res._body).toHaveProperty('id');  
                expect(res._body.email).toBe(newUser.email); 

                request(app)
                    .post("/api/login")
                    .send({
                        "email": newUser.email,
                        "password": newUser.password
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((res) => {
                        expect(res._body).toHaveProperty('token');  
                        
                    })

            })
    });
    
});


describe("POST /api/posts", () => {

    it("No debe registrar un Post nuevo sin autorización", async () => {

        let postObj=newPost;
        postObj.title = postObj.title + Math.random();

        return request(app)
            .post("/api/posts")
            .send(postObj)
            .expect('Content-Type', /json/)
            .expect(401)
            .then((res) => {
                expect(res._body).toHaveProperty('message');  
                expect(res._body.message).toBe("Usuario no identificado"); 
            }) 
        
    });
});