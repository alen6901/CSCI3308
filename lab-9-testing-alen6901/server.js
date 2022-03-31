/** Load components
 * Express      - A Node.js Framework
 * Body-Parser  - A tool to help use parse the data in a post request
 */
const express = require("express");
const bodyParser = require("body-parser");
const req = require("express/lib/request");

/** express configuration
 * - Support json encoded bodies
 * - Support encoded bodies
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ops = [
    {
        id: 1,
        name: "Add",
        sign: "+",
    },
    {
        id: 2,
        name: "Subtract",
        sign: "-",
    },
    {
        id: 3,
        name: "Multiply",
        sign: "*",
    },
];

const players = [
    {
        id: 1,
        name: "John Doe",
        dob: "2000-02-20",
    },
    {
        id: 2,
        name: "2",
        dob: "1999-02-20",
    },
    {
        id: 3,
        name: "3",
        dob: "1999-02-20",
    },
];

// Simple get api provided to check if the node.js starts up successfully. Opening up http://localhost:3000 should display the below returned json.
app.get("/", (req, res) => {
    res.json({ status: "success", message: "Welcome!" });
});

app.get("/operations", (request, response) => {
    response.send(ops);
});

// GET (BY ID)
app.get("/operations/:id", (request, response) => {
    const opsId = request.params.id;
    const op = ops.find((op) => op.id === parseInt(opsId));
    if (!op)
        return response
            .status(404)
            .send("The task with the provided ID does not exist.");
    response.send(op);
});

// POST, add to the list of ops
app.post("/operations", (request, response) => {
    const op = {
        id: ops.length + 1,
        name: request.body.name,
        sign: request.body.sign,
    };

    ops.push(op);
    response.status(201).send(op);
});
// =============================================================================
// Part B TODO: Add your code support two new API's /players/add and /players/:id here.
app.post("/players/add", (request, response) => {
    const op = {
        id: request.body.id,
        pname: request.body.pname,
        dob: request.body.dob,
    };
    if (
        typeof op.id === "number" &&
        typeof op.pname === "string" &&
        typeof op.dob === "string"
    ) {
        ops.push(op);
        response.status(200).json({ message: "Success!" });
    } else response.status(400).json({ message: "Invalid input" });
});
app.get("/players/:id", (request, response) => {
    const playerId = request.params.id;
    console.log(typeof playerId);
    const player = players.find((player) => player.id === parseInt(playerId));
    if (!parseInt(playerId))
        return response.status(404).json({ message: "Invalid input" });
    else if (!player)
        return response.status(404).json({ message: "Player doesn't exist" });
    return response.json(player);
});
module.exports = app.listen(3000);
console.log("3000 is the magic port");
