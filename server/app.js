"use strict"

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", route)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}
);