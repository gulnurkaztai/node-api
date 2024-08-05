import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
let users = [
    { id: 1, name: "Jane" },
    { id: 2, name: "John" },
];
app.put("/users", (req, res) => {
    const { id, name } = req.body;
    users = users.map((user) => {
        if (user.id === id) {
            user.name = name;
        }
        return user;
    });
    res.json(users);
});
app.delete("/users", (req, res) => {
    const { id } = req.body;
    users = users.filter((user) => user.id !== id);
    res.json(users);
});
app.post("/users", (req, res) => {
    const newUser = {
        id: Date.now(),
        name: req.body.name,
    };
    users.push(newUser);
    res.json(users);
});
app.get("/users", (req, res) => {
    console.log("Received GET /users request");
    res.json(users);
});
const isAuthorized = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === 'mysecret') {
        next();
    }
    else {
        res.status(401);
        res.json({ message: 'No Access' });
    }
};
// get one user
app.get("/users/:id", isAuthorized, (req, res) => {
    const id = +req.params.id;
    const user = users.filter(user => user.id === id);
    res.json(user);
});
app.listen(port, () => {
    console.log("Server is running on port", port);
    console.log("hello");
});
//# sourceMappingURL=index.js.map